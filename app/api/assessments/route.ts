import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthedStudentAccess, getAuthedTeacherAccess } from "@/lib/access-control";

type AssessmentSource = "TUITION" | "SCHOOL";

type CreateAssessmentBody = {
  studentId?: unknown;
  source?: unknown;
  subject?: unknown;
  title?: unknown;
  score?: unknown;
  maxScore?: unknown;
  takenAt?: unknown;
  notes?: unknown;
};

function toInt(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number.parseInt(value, 10);
    if (Number.isInteger(parsed)) return parsed;
  }
  return null;
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function normalizeSource(value: unknown): AssessmentSource | null {
  if (value === "TUITION" || value === "SCHOOL") return value;
  return null;
}

function normalizeText(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

function parseDate(value: unknown): Date | null {
  if (typeof value !== "string" || !value.trim()) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function validateScore(score: number | null, maxScore: number | null): string | null {
  if (score == null || maxScore == null) return "Score and max score are required";
  if (score < 0 || maxScore <= 0) return "Invalid score values";
  if (score > maxScore) return "Score cannot be greater than max score";
  return null;
}

export async function GET(req: Request) {
  const [teacherAccess, studentAccess] = await Promise.all([
    getAuthedTeacherAccess(),
    getAuthedStudentAccess(),
  ]);

  if (!teacherAccess && !studentAccess) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const requestedStudentId = toInt(searchParams.get("studentId"));
  const source = normalizeSource(searchParams.get("source"));
  const subjectFilter = normalizeText(searchParams.get("subject"), 80);
  const from = parseDate(searchParams.get("from"));
  const to = parseDate(searchParams.get("to"));

  if (requestedStudentId != null && !Number.isInteger(requestedStudentId)) {
    return NextResponse.json({ error: "Invalid studentId" }, { status: 400 });
  }

  if (teacherAccess) {
    const where = {
      teacherId: teacherAccess.teacherId,
      ...(requestedStudentId ? { studentId: requestedStudentId } : {}),
      ...(source ? { source } : {}),
      ...(subjectFilter ? { subject: subjectFilter } : {}),
      ...(from || to
        ? {
            takenAt: {
              ...(from ? { gte: from } : {}),
              ...(to ? { lte: to } : {}),
            },
          }
        : {}),
    };

    const [assessments, students] = await Promise.all([
      prisma.assessment.findMany({
        where,
        orderBy: [{ takenAt: "asc" }, { id: "asc" }],
      }),
      prisma.student.findMany({
        where: { teacher: { id: teacherAccess.teacherId } },
        select: {
          id: true,
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: { id: "asc" },
      }),
    ]);

    return NextResponse.json({
      role: "TEACHER",
      students: students.map((student) => ({
        id: student.id,
        name: [student.user.firstName, student.user.lastName].filter(Boolean).join(" ").trim() || "Student",
      })),
      assessments,
    });
  }

  const where = {
    studentId: studentAccess!.studentId,
    ...(source ? { source } : {}),
    ...(subjectFilter ? { subject: subjectFilter } : {}),
    ...(from || to
      ? {
          takenAt: {
            ...(from ? { gte: from } : {}),
            ...(to ? { lte: to } : {}),
          },
        }
      : {}),
  };

  const assessments = await prisma.assessment.findMany({
    where,
    orderBy: [{ takenAt: "asc" }, { id: "asc" }],
  });

  return NextResponse.json({
    role: "STUDENT",
    assessments,
  });
}

export async function POST(req: Request) {
  const [teacherAccess, studentAccess] = await Promise.all([
    getAuthedTeacherAccess(),
    getAuthedStudentAccess(),
  ]);

  if (!teacherAccess && !studentAccess) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as CreateAssessmentBody | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const source = normalizeSource(body.source);
  const subject = normalizeText(body.subject, 80);
  const title = normalizeText(body.title, 120);
  const score = toNumber(body.score);
  const maxScore = toNumber(body.maxScore);
  const takenAt = parseDate(body.takenAt);
  const notes = normalizeText(body.notes, 800);

  if (!source || !subject || !takenAt) {
    return NextResponse.json({ error: "source, subject and takenAt are required" }, { status: 400 });
  }

  const scoreValidation = validateScore(score, maxScore);
  if (scoreValidation) {
    return NextResponse.json({ error: scoreValidation }, { status: 400 });
  }

  if (teacherAccess) {
    const studentId = toInt(body.studentId);
    if (!studentId) {
      return NextResponse.json({ error: "studentId is required" }, { status: 400 });
    }

    const ownedStudent = await prisma.student.findFirst({
      where: {
        id: studentId,
        teacher: { id: teacherAccess.teacherId },
      },
      select: { id: true },
    });

    if (!ownedStudent) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const assessment = await prisma.assessment.create({
      data: {
        studentId,
        teacherId: teacherAccess.teacherId,
        source,
        subject,
        title,
        score: score!,
        maxScore: maxScore!,
        takenAt,
        notes,
        createdByRole: "TEACHER",
      },
    });

    return NextResponse.json(assessment, { status: 201 });
  }

  if (source !== "SCHOOL") {
    return NextResponse.json(
      { error: "Students can only create school assessments" },
      { status: 403 }
    );
  }

  const student = await prisma.student.findUnique({
    where: { id: studentAccess!.studentId },
    select: {
      id: true,
      teacher: {
        select: { id: true },
      },
    },
  });

  if (!student?.teacher?.id) {
    return NextResponse.json({ error: "Teacher not found for student" }, { status: 400 });
  }

  const assessment = await prisma.assessment.create({
    data: {
      studentId: student.id,
      teacherId: student.teacher.id,
      source,
      subject,
      title,
      score: score!,
      maxScore: maxScore!,
      takenAt,
      notes,
      createdByRole: "STUDENT",
    },
  });

  return NextResponse.json(assessment, { status: 201 });
}
