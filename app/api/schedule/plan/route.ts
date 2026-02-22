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

async function parseConstraintsWithAi(prompt: string): Promise<SchedulerConstraints | null> {
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

    const schema = {
      type: "object",
      required: [
        "daysPerWeek",
        "classesPerDay",
        "studentsPerHour",
        "classHours",
        "filters",
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
      },
      additionalProperties: false,
    };

    const response = await aiModule.generateObject({
      model: openaiModule.openai("gpt-4.1-mini"),
      output: "no-schema",
      schema,
      prompt: [
        "Extract scheduling constraints from this prompt.",
        "Return JSON only with these keys:",
        "daysPerWeek, classesPerDay, studentsPerHour, classHours, filters.",
        "classHours is an array of { className, hoursPerWeek }.",
        "filters contains booleans sameBoardOnly and sameGradeOnly.",
        `Prompt: ${prompt}`,
      ].join("\n"),
    });

    return sanitizeConstraints(response.object);
  } catch {
    return null;
  }
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
  let parsed: SchedulerConstraints;

  if (hasPrompt) {
    const aiParsed = await parseConstraintsWithAi(prompt);
    if (aiParsed) {
      parser = "ai-sdk";
      parsed = aiParsed;
    } else {
      parser = "fallback";
      parsed = parseConstraintsFromPromptFallback(prompt);
    }
  } else {
    parser = "direct-constraints";
    parsed = sanitizeConstraints(body.constraints);
  }

  const finalConstraints = mergeConstraints(
    parsed,
    hasConstraints ? (body.constraints as Partial<SchedulerConstraints>) : undefined
  );
  const plan = buildSchedulePlan(students, finalConstraints);

  return NextResponse.json({
    parser,
    plan,
  });
}
