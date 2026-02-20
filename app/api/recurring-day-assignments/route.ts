import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import type { WeekDay } from "@/types/scheduler";
import { getTeacherIdFromAuth } from "@/lib/get-teacher-id-from-auth";

const VALID_DAYS: WeekDay[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function isWeekDay(value: unknown): value is WeekDay {
  return typeof value === "string" && VALID_DAYS.includes(value as WeekDay);
}

export async function GET() {
  const teacherId = await getTeacherIdFromAuth();
  if (!teacherId) {
    return NextResponse.json([], { status: 401 });
  }

  const assignments = await prisma.recurringDayAssignment.findMany({
    where: {
      recurringSchedule: { teacherId },
    },
    select: {
      recurringScheduleId: true,
      day: true,
      student: {
        select: {
          id: true,
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(assignments);
}

export async function POST(req: Request) {
  const teacherId = await getTeacherIdFromAuth();
  if (!teacherId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const recurringScheduleId = Number(body?.recurringScheduleId);
  const studentId = Number(body?.studentId);
  const day = body?.day;

  if (!Number.isInteger(recurringScheduleId) || !Number.isInteger(studentId) || !isWeekDay(day)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const [schedule, student] = await Promise.all([
    prisma.recurringSchedule.findFirst({
      where: { id: recurringScheduleId, teacherId },
      include: { days: { select: { day: true } } },
    }),
    prisma.student.findFirst({
      where: {
        id: studentId,
        teacher: { id: teacherId },
      },
      select: { id: true },
    }),
  ]);

  if (!schedule || !student) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (!schedule.days.some((d) => d.day === day)) {
    return NextResponse.json({ error: "Day is not enabled for this schedule" }, { status: 400 });
  }

  const [existing, currentCount] = await Promise.all([
    prisma.recurringDayAssignment.findFirst({
      where: { recurringScheduleId, day, studentId },
      select: { id: true },
    }),
    prisma.recurringDayAssignment.count({
      where: { recurringScheduleId, day },
    }),
  ]);

  if (existing) {
    return NextResponse.json({ error: "Student already assigned to this slot" }, { status: 409 });
  }

  if (currentCount >= schedule.maxStudents) {
    return NextResponse.json({ error: "Slot is full" }, { status: 409 });
  }

  try {
    const created = await prisma.recurringDayAssignment.create({
      data: { recurringScheduleId, day, studentId },
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error: unknown) {
    if (typeof error === "object" && error && "code" in error && error.code === "P2002") {
      return NextResponse.json({ error: "Student already assigned to this slot" }, { status: 409 });
    }
    console.error("POST /api/recurring-day-assignments error:", error);
    return NextResponse.json({ error: "Failed to create assignment" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const teacherId = await getTeacherIdFromAuth();
  if (!teacherId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const recurringScheduleId = Number(body?.recurringScheduleId);
  const studentId = Number(body?.studentId);
  const day = body?.day;

  if (!Number.isInteger(recurringScheduleId) || !Number.isInteger(studentId) || !isWeekDay(day)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const [schedule, student] = await Promise.all([
    prisma.recurringSchedule.findFirst({
      where: { id: recurringScheduleId, teacherId },
      select: { id: true },
    }),
    prisma.student.findFirst({
      where: {
        id: studentId,
        teacher: { id: teacherId },
      },
      select: { id: true },
    }),
  ]);

  if (!schedule || !student) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const deleted = await prisma.recurringDayAssignment.deleteMany({
    where: { recurringScheduleId, day, studentId },
  });

  return NextResponse.json({ success: deleted.count > 0 });
}
