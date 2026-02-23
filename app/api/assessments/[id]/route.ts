import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthedStudentAccess, getAuthedTeacherAccess } from "@/lib/access-control";

type UpdateAssessmentBody = {
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

function normalizeSource(value: unknown): "TUITION" | "SCHOOL" | null {
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

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const [teacherAccess, studentAccess] = await Promise.all([
    getAuthedTeacherAccess(),
    getAuthedStudentAccess(),
  ]);

  if (!teacherAccess && !studentAccess) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const assessmentId = toInt(id);
  if (!assessmentId) {
    return NextResponse.json({ error: "Invalid assessment id" }, { status: 400 });
  }

  const existing = await prisma.assessment.findUnique({
    where: { id: assessmentId },
    select: {
      id: true,
      teacherId: true,
      studentId: true,
      source: true,
      score: true,
      maxScore: true,
      subject: true,
      title: true,
      takenAt: true,
      notes: true,
    },
  });

  if (!existing) {
    return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
  }

  const body = (await req.json().catch(() => null)) as UpdateAssessmentBody | null;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const source = normalizeSource(body.source);
  const subject = normalizeText(body.subject, 80);
  const title = typeof body.title === "string" ? body.title.trim().slice(0, 120) : undefined;
  const score = toNumber(body.score);
  const maxScore = toNumber(body.maxScore);
  const takenAt = parseDate(body.takenAt);
  const notes = typeof body.notes === "string" ? body.notes.trim().slice(0, 800) : undefined;

  if (teacherAccess) {
    if (existing.teacherId !== teacherAccess.teacherId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const finalScore = score ?? existing.score;
    const finalMaxScore = maxScore ?? existing.maxScore;
    const scoreValidation = validateScore(finalScore, finalMaxScore);
    if (scoreValidation) {
      return NextResponse.json({ error: scoreValidation }, { status: 400 });
    }

    const updated = await prisma.assessment.update({
      where: { id: assessmentId },
      data: {
        ...(source ? { source } : {}),
        ...(subject ? { subject } : {}),
        ...(title !== undefined ? { title: title || null } : {}),
        ...(score != null ? { score } : {}),
        ...(maxScore != null ? { maxScore } : {}),
        ...(takenAt ? { takenAt } : {}),
        ...(notes !== undefined ? { notes: notes || null } : {}),
      },
    });

    return NextResponse.json(updated);
  }

  if (existing.studentId !== studentAccess!.studentId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (existing.source !== "SCHOOL") {
    return NextResponse.json(
      { error: "Only school assessments are editable by students" },
      { status: 403 }
    );
  }

  if (source && source !== "SCHOOL") {
    return NextResponse.json({ error: "Invalid source update" }, { status: 400 });
  }

  const finalScore = score ?? existing.score;
  const finalMaxScore = maxScore ?? existing.maxScore;
  const scoreValidation = validateScore(finalScore, finalMaxScore);
  if (scoreValidation) {
    return NextResponse.json({ error: scoreValidation }, { status: 400 });
  }

  const updated = await prisma.assessment.update({
    where: { id: assessmentId },
    data: {
      ...(subject ? { subject } : {}),
      ...(title !== undefined ? { title: title || null } : {}),
      ...(score != null ? { score } : {}),
      ...(maxScore != null ? { maxScore } : {}),
      ...(takenAt ? { takenAt } : {}),
      ...(notes !== undefined ? { notes: notes || null } : {}),
      source: "SCHOOL",
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const teacherAccess = await getAuthedTeacherAccess();
  if (!teacherAccess) {
    return NextResponse.json({ error: "Only teachers can delete assessments" }, { status: 403 });
  }

  const { id } = await context.params;
  const assessmentId = toInt(id);
  if (!assessmentId) {
    return NextResponse.json({ error: "Invalid assessment id" }, { status: 400 });
  }

  const existing = await prisma.assessment.findUnique({
    where: { id: assessmentId },
    select: { id: true, teacherId: true },
  });

  if (!existing || existing.teacherId !== teacherAccess.teacherId) {
    return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
  }

  await prisma.assessment.delete({
    where: { id: assessmentId },
  });

  return NextResponse.json({ success: true });
}
