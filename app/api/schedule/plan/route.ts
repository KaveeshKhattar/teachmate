import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTeacherIdFromAuth } from "@/lib/get-teacher-id-from-auth";
import {
  buildSchedulePlan,
  parseConstraintsFromPromptFallback,
  sanitizeConstraints,
  type SchedulerConstraints,
} from "@/lib/ai-scheduler";
import type { Student } from "@/types/scheduler";

interface PlanRequestBody {
  prompt?: string;
  constraints?: Partial<SchedulerConstraints>;
}

type AiProvider = "openai" | "huggingface";
type AiProviderUsed = AiProvider | null;

interface AiParseResult {
  constraints: SchedulerConstraints | null;
  providerUsed: AiProviderUsed;
  reason: string | null;
}

interface ProviderParseResult {
  constraints: SchedulerConstraints | null;
  reason: string;
}

const CONSTRAINT_SCHEMA = {
  type: "object",
  required: [
    "daysPerWeek",
    "classesPerDay",
    "studentsPerHour",
    "classHours",
    "filters",
    "offDays",
    "preferredDays",
  ],
  properties: {
    daysPerWeek: { type: "integer", minimum: 1, maximum: 7 },
    classesPerDay: { type: "integer", minimum: 1, maximum: 24 },
    studentsPerHour: { type: "integer", minimum: 1, maximum: 100 },
    classHours: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        required: ["className", "hoursPerWeek"],
        properties: {
          className: { type: "string", minLength: 1, maxLength: 60 },
          hoursPerWeek: { type: "integer", minimum: 1, maximum: 40 },
        },
        additionalProperties: false,
      },
    },
    filters: {
      type: "object",
      required: ["sameBoardOnly", "sameGradeOnly"],
      properties: {
        sameBoardOnly: { type: "boolean" },
        sameGradeOnly: { type: "boolean" },
      },
      additionalProperties: false,
    },
    offDays: {
      type: "array",
      items: {
        type: "string",
        enum: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
      },
    },
    preferredDays: {
      type: "array",
      items: {
        type: "string",
        enum: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
      },
    },
  },
  additionalProperties: false,
} as const;

function getAiProvider(): AiProvider {
  const value = process.env.SCHEDULER_AI_PROVIDER?.trim().toLowerCase();
  if (value === "openai" || value === "huggingface") return value;
  return process.env.HF_TOKEN ? "huggingface" : "openai";
}

function buildConstraintExtractionPrompt(prompt: string): string {
  return [
    "Extract scheduling constraints from this prompt.",
    "Return JSON only with these keys:",
    "daysPerWeek, classesPerDay, studentsPerHour, classHours, filters, offDays, preferredDays.",
    "classHours is an array of { className, hoursPerWeek }.",
    "filters contains booleans sameBoardOnly and sameGradeOnly.",
    "offDays is an array of weekday codes from MON,TUE,WED,THU,FRI,SAT,SUN.",
    "preferredDays is an ordered array of weekday codes to prioritize when reassigning sessions.",
    "If prompt says move/cancel classes from day X to day Y, put X in offDays and Y in preferredDays.",
    `Prompt: ${prompt}`,
  ].join("\n");
}

function materializeRelativeDaysInPrompt(prompt: string, now: Date = new Date()): string {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = dayNames[now.getDay()];
  const tomorrow = dayNames[(now.getDay() + 1) % 7];

  return prompt
    .replace(/\btoday'?s?\b/gi, today)
    .replace(/\btomorrow'?s?\b/gi, tomorrow);
}

function extractFirstJsonObject(text: string): Record<string, unknown> | null {
  let depth = 0;
  let start = -1;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (char === "{") {
      if (depth === 0) start = i;
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0 && start >= 0) {
        const candidate = text.slice(start, i + 1);
        try {
          const parsed = JSON.parse(candidate);
          if (isObject(parsed)) return parsed;
        } catch {
          // continue scanning in case there is a later valid JSON object
        }
      }
    }
  }

  return null;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function mergeConstraints(
  parsed: SchedulerConstraints,
  incoming?: Partial<SchedulerConstraints>
): SchedulerConstraints {
  if (!incoming || !isObject(incoming)) return parsed;

  const merged = {
    ...parsed,
    ...incoming,
    filters: {
      ...parsed.filters,
      ...(incoming.filters ?? {}),
    },
    classHours: Array.isArray(incoming.classHours) && incoming.classHours.length > 0
      ? incoming.classHours
      : parsed.classHours,
  };

  return sanitizeConstraints(merged);
}

async function parseConstraintsWithOpenAi(prompt: string): Promise<SchedulerConstraints | null> {
  try {
    const dynamicImport = async (moduleName: string): Promise<unknown> =>
      import(/* webpackIgnore: true */ moduleName);
    const aiModule = (await dynamicImport("ai")) as {
      generateObject?: (args: Record<string, unknown>) => Promise<{ object: unknown }>;
    };
    const openaiModule = (await dynamicImport("@ai-sdk/openai")) as {
      openai?: (model: string) => unknown;
    };

    if (!aiModule.generateObject || !openaiModule.openai || !process.env.OPENAI_API_KEY) {
      return null;
    }

    const response = await aiModule.generateObject({
      model: openaiModule.openai("gpt-4.1-mini"),
      output: "no-schema",
      schema: CONSTRAINT_SCHEMA,
      prompt: buildConstraintExtractionPrompt(prompt),
    });

    return sanitizeConstraints(response.object);
  } catch {
    return null;
  }
}

async function parseConstraintsWithOpenAiDebug(prompt: string): Promise<ProviderParseResult> {
  if (!process.env.OPENAI_API_KEY) {
    return { constraints: null, reason: "OpenAI unavailable: OPENAI_API_KEY is not set" };
  }

  const parsed = await parseConstraintsWithOpenAi(prompt);
  if (!parsed) {
    return { constraints: null, reason: "OpenAI call failed or returned invalid constraints JSON" };
  }

  return { constraints: parsed, reason: "Parsed with OpenAI" };
}

async function parseConstraintsWithHuggingFaceDebug(prompt: string): Promise<ProviderParseResult> {
  const apiKey = process.env.HF_TOKEN;
  if (!apiKey) {
    return { constraints: null, reason: "Hugging Face unavailable: HF_TOKEN is not set" };
  }

  const model = process.env.HUGGINGFACE_MODEL ?? "meta-llama/Llama-3.1-8B-Instruct:novita";
  const messages = [
    {
      role: "system" as const,
      content:
        "You extract schedule constraints. Reply with valid JSON only and no extra text.",
    },
    {
      role: "user" as const,
      content: buildConstraintExtractionPrompt(prompt),
    },
  ];

  try {
    const dynamicImport = async (moduleName: string): Promise<unknown> =>
      import(/* webpackIgnore: true */ moduleName);
    const hfModule = (await dynamicImport("@huggingface/inference")) as {
      InferenceClient?: new (token: string) => {
        chatCompletion?: (args: {
          model: string;
          messages: Array<{ role: "system" | "user" | "assistant"; content: string }>;
          temperature?: number;
          max_tokens?: number;
        }) => Promise<{ choices?: Array<{ message?: { content?: unknown } }> }>;
        chat?: {
          completions?: {
            create?: (args: {
              model: string;
              messages: Array<{ role: "system" | "user" | "assistant"; content: string }>;
              temperature?: number;
              max_tokens?: number;
            }) => Promise<{ choices?: Array<{ message?: { content?: unknown } }> }>;
          };
        };
      };
    };

    if (!hfModule.InferenceClient) {
      return { constraints: null, reason: "Hugging Face SDK import failed: InferenceClient not found" };
    }

    const client = new hfModule.InferenceClient(apiKey);
    const legacyCall = client.chatCompletion?.bind(client);
    const modernCall = client.chat?.completions?.create?.bind(client.chat.completions);
    const call = modernCall ?? legacyCall;

    if (!call) {
      return {
        constraints: null,
        reason:
          "Hugging Face SDK method not found. Expected client.chat.completions.create or client.chatCompletion.",
      };
    }

    const completion = await call({
      model,
      temperature: 0,
      max_tokens: 300,
      messages,
    });

    const content = completion.choices?.[0]?.message?.content;
    const generated =
      typeof content === "string"
        ? content
        : Array.isArray(content)
          ? content
              .map((part) =>
                part && typeof part === "object" && "text" in part
                  ? String((part as { text?: unknown }).text ?? "")
                  : ""
              )
              .join("")
          : null;

    if (!generated || generated.trim().length === 0) {
      return { constraints: null, reason: "Hugging Face returned an empty completion" };
    }

    const extracted = extractFirstJsonObject(generated);
    if (!extracted) {
      return {
        constraints: null,
        reason: `Hugging Face returned non-JSON content. Preview: ${generated.slice(0, 180)}`,
      };
    }

    return {
      constraints: sanitizeConstraints(extracted),
      reason: "Parsed with Hugging Face InferenceClient",
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return {
      constraints: null,
      reason: `Hugging Face request error: ${message}`,
    };
  }
}

async function parseConstraintsWithHuggingFace(
  prompt: string
): Promise<SchedulerConstraints | null> {
  const result = await parseConstraintsWithHuggingFaceDebug(prompt);
  return result.constraints;
}

async function parseConstraintsWithAi(prompt: string): Promise<SchedulerConstraints | null> {
  const provider = getAiProvider();

  if (provider === "huggingface") {
    return parseConstraintsWithHuggingFace(prompt);
  }

  const openAiParsed = await parseConstraintsWithOpenAi(prompt);
  if (openAiParsed) return openAiParsed;
  return parseConstraintsWithHuggingFace(prompt);
}

async function parseConstraintsWithAiDebug(prompt: string): Promise<AiParseResult> {
  const provider = getAiProvider();

  if (provider === "huggingface") {
    const hfResult = await parseConstraintsWithHuggingFaceDebug(prompt);
    if (hfResult.constraints) {
      return {
        constraints: hfResult.constraints,
        providerUsed: "huggingface",
        reason: hfResult.reason,
      };
    }

    return {
      constraints: null,
      providerUsed: null,
      reason: `Hugging Face failed: ${hfResult.reason}. Using fallback parser`,
    };
  }

  const openAiResult = await parseConstraintsWithOpenAiDebug(prompt);
  if (openAiResult.constraints) {
    return {
      constraints: openAiResult.constraints,
      providerUsed: "openai",
      reason: openAiResult.reason,
    };
  }

  const hfResult = await parseConstraintsWithHuggingFaceDebug(prompt);
  if (hfResult.constraints) {
    return {
      constraints: hfResult.constraints,
      providerUsed: "huggingface",
      reason: `OpenAI failed: ${openAiResult.reason}. Then Hugging Face succeeded: ${hfResult.reason}`,
    };
  }

  return {
    constraints: null,
    providerUsed: null,
    reason: `OpenAI failed: ${openAiResult.reason}. Hugging Face failed: ${hfResult.reason}. Using fallback parser`,
  };
}

async function getTeacherStudents(teacherId: number): Promise<Student[]> {
  const students = await prisma.student.findMany({
    where: {
      teacher: {
        id: teacherId,
      },
    },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: { id: "asc" },
  });

  return students.map((student) => ({
    id: student.id,
    userId: student.userId,
    teacherId: student.teacherId,
    grade: student.grade,
    school: student.school,
    board: student.board,
    fees: student.fees,
    numOfClassesPerWeek: student.numOfClassesPerWeek,
    createdAt: student.createdAt,
    updatedAt: student.updatedAt,
    user: {
      firstName: student.user.firstName ?? "",
      lastName: student.user.lastName ?? "",
    },
  }));
}

export async function POST(req: Request) {
  const teacherId = await getTeacherIdFromAuth();
  if (!teacherId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as PlanRequestBody | null;
  if (!body || !isObject(body)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
  const hasPrompt = prompt.length > 0;
  const resolvedPrompt = hasPrompt ? materializeRelativeDaysInPrompt(prompt) : "";
  const hasConstraints = isObject(body.constraints);

  if (!hasPrompt && !hasConstraints) {
    return NextResponse.json(
      { error: "Provide at least one of: prompt or constraints" },
      { status: 400 }
    );
  }

  const students = await getTeacherStudents(teacherId);
  if (students.length === 0) {
    return NextResponse.json(
      {
        error: "No students found for this teacher",
      },
      { status: 400 }
    );
  }

  let parser: "ai-sdk" | "fallback" | "direct-constraints";
  let parserReason: string | null = null;
  let aiProviderUsed: AiProviderUsed = null;
  let parsed: SchedulerConstraints;

  if (hasPrompt) {
    const aiParsed = await parseConstraintsWithAiDebug(resolvedPrompt);
    parserReason = aiParsed.reason;
    aiProviderUsed = aiParsed.providerUsed;

    if (aiParsed.constraints) {
      parser = "ai-sdk";
      parsed = aiParsed.constraints;
    } else {
      parser = "fallback";
      parsed = parseConstraintsFromPromptFallback(resolvedPrompt);
    }
  } else {
    parser = "direct-constraints";
    parserReason = "Used direct constraints from UI payload";
    parsed = sanitizeConstraints(body.constraints);
  }

  const finalConstraints = mergeConstraints(
    parsed,
    hasConstraints ? (body.constraints as Partial<SchedulerConstraints>) : undefined
  );
  const plan = buildSchedulePlan(students, finalConstraints);

  return NextResponse.json({
    parser,
    parserReason,
    aiProviderUsed,
    plan,
  });
}
