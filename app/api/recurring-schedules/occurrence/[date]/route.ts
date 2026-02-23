// app/api/recurring-schedules/occurrence/[date]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTeacherIdFromAuth } from "@/lib/get-teacher-id-from-auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  const teacherId = await getTeacherIdFromAuth();
  if (!teacherId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { date } = await params; // ← await params
  const { startTime, endTime } = await req.json();
  const scheduleIdNum = Number(req.nextUrl.searchParams.get("scheduleId"));

  if (!Number.isInteger(scheduleIdNum)) {
    return NextResponse.json({ error: "Invalid scheduleId" }, { status: 400 });
  }

  const decoded = decodeURIComponent(date); // "2026-02-17"
  const occurrenceDate = new Date(decoded + "T00:00:00Z"); // explicit UTC midnight

  if (isNaN(occurrenceDate.getTime())) {
    return NextResponse.json({ error: "Invalid date: " + decoded }, { status: 400 });
  }

  const ownedSchedule = await prisma.recurringSchedule.findFirst({
    where: { id: scheduleIdNum, teacherId },
    select: { id: true },
  });

  if (!ownedSchedule) {
    return NextResponse.json({ error: "Schedule not found" }, { status: 404 });
  }

  // Normalize to midnight UTC
  const dateOnly = new Date(Date.UTC(
    occurrenceDate.getUTCFullYear(),
    occurrenceDate.getUTCMonth(),
    occurrenceDate.getUTCDate(),
    0, 0, 0, 0
  ));

  // Build full DateTime objects for startTime/endTime on that date
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);

  const newStart = new Date(Date.UTC(
    occurrenceDate.getUTCFullYear(),
    occurrenceDate.getUTCMonth(),
    occurrenceDate.getUTCDate(),
    sh, sm, 0, 0
  ));

  const newEnd = new Date(Date.UTC(
    occurrenceDate.getUTCFullYear(),
    occurrenceDate.getUTCMonth(),
    occurrenceDate.getUTCDate(),
    eh, em, 0, 0
  ));

  const exception = await prisma.recurringException.upsert({
    where: {
      recurringScheduleId_date: {
        recurringScheduleId: scheduleIdNum,
        date: dateOnly,
      },
    },
    update: {
      startTime: newStart,
      endTime: newEnd,
    },
    create: {
      recurringScheduleId: scheduleIdNum,
      date: dateOnly,
      startTime: newStart,
      endTime: newEnd,
    },
  });

  return NextResponse.json(exception);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ date: string }> }
) {
  const teacherId = await getTeacherIdFromAuth();
  if (!teacherId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { date } = await params; // ← await params here too
  const scheduleIdNum = Number(req.nextUrl.searchParams.get("scheduleId"));

  if (!Number.isInteger(scheduleIdNum)) {
    return NextResponse.json({ error: "Invalid scheduleId" }, { status: 400 });
  }

  const decoded = decodeURIComponent(date);
  const occurrenceDate = new Date(decoded);

  if (isNaN(occurrenceDate.getTime())) {
    return NextResponse.json({ error: "Invalid date: " + decoded }, { status: 400 });
  }

  const ownedSchedule = await prisma.recurringSchedule.findFirst({
    where: { id: scheduleIdNum, teacherId },
    select: { id: true },
  });

  if (!ownedSchedule) {
    return NextResponse.json({ error: "Schedule not found" }, { status: 404 });
  }

  const dateOnly = new Date(Date.UTC(
    occurrenceDate.getUTCFullYear(),
    occurrenceDate.getUTCMonth(),
    occurrenceDate.getUTCDate(),
    0, 0, 0, 0
  ));

  await prisma.recurringException.upsert({
    where: {
      recurringScheduleId_date: {
        recurringScheduleId: scheduleIdNum,
        date: dateOnly,
      },
    },
    update: {}, // already exists as a skip
    create: {
      recurringScheduleId: scheduleIdNum,
      date: dateOnly,
      // no startTime/endTime = deletion marker
    },
  });

  return NextResponse.json({ ok: true });
}
