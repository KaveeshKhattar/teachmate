import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTeacherIdFromAuth } from "@/lib/get-teacher-id-from-auth";
import type { SchedulerPlanResult } from "@/lib/ai-scheduler";
import type { WeekDay } from "@/types/scheduler";

type RequestBody = {
  plan?: SchedulerPlanResult;
  hoursPerClass?: number;
  studentsPerClass?: number;
};

type PlanSession = {
  slotIndex: number;
};

type PlanDay = {
  day: WeekDay;
  sessions: PlanSession[];
};

const VALID_DAYS: WeekDay[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function isWeekDay(value: unknown): value is WeekDay {
  return typeof value === "string" && VALID_DAYS.includes(value as WeekDay);
}

function toPositiveInt(value: unknown, fallback: number): number {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.max(1, Math.round(parsed));
}

function normalizePlanDays(plan: unknown): PlanDay[] {
  if (!isObject(plan) || !Array.isArray(plan.schedule)) return [];

  const normalized: PlanDay[] = [];

  for (const dayRow of plan.schedule) {
    if (!isObject(dayRow) || !isWeekDay(dayRow.day) || !Array.isArray(dayRow.sessions)) continue;

    const sessions: PlanSession[] = dayRow.sessions
      .filter((session) => isObject(session) && Number.isInteger(Number(session.slotIndex)))
      .map((session) => ({
        slotIndex: Math.max(1, Number(session.slotIndex)),
      }));

    normalized.push({ day: dayRow.day, sessions });
  }

  return normalized;
}

function minutesOfUtc(date: Date): number {
  return date.getUTCHours() * 60 + date.getUTCMinutes();
}

function toUtcDateWithMinutes(baseDate: Date, minutes: number): Date {
  const result = new Date(Date.UTC(
    baseDate.getUTCFullYear(),
    baseDate.getUTCMonth(),
    baseDate.getUTCDate(),
    0,
    0,
    0,
    0
  ));
  result.setUTCMinutes(minutes);
  return result;
}

export async function POST(req: Request) {
  const teacherId = await getTeacherIdFromAuth();
  if (!teacherId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as RequestBody | null;
  if (!body?.plan) {
    return NextResponse.json({ error: "Invalid payload: plan is required" }, { status: 400 });
  }

  const planDays = normalizePlanDays(body.plan);
  if (planDays.length === 0) {
    return NextResponse.json({ error: "Plan has no valid schedule days" }, { status: 400 });
  }

  const hoursPerClass = toPositiveInt(body.hoursPerClass, 1);
  const studentsPerClass = toPositiveInt(
    body.studentsPerClass ?? body.plan.constraints?.studentsPerHour,
    4
  );
  const durationMinutes = Math.max(30, hoursPerClass * 60);
  const todayUtc = new Date();
  const dayBaseDate = new Date(Date.UTC(
    todayUtc.getUTCFullYear(),
    todayUtc.getUTCMonth(),
    todayUtc.getUTCDate(),
    0,
    0,
    0,
    0
  ));

  const schedules = await prisma.recurringSchedule.findMany({
    where: { teacherId },
    include: { days: { select: { day: true } } },
    orderBy: [{ startTime: "asc" }, { id: "asc" }],
  });

  const slotsByDay = new Map<WeekDay, Array<{ startTime: Date; endTime: Date }>>();
  for (const day of VALID_DAYS) {
    const daySlots = schedules
      .filter((schedule) => schedule.days.some((d) => d.day === day))
      .map((schedule) => ({
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      }))
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
    slotsByDay.set(day, daySlots);
  }

  const created: Array<{ day: WeekDay; startTime: string; endTime: string }> = [];

  await prisma.$transaction(async (tx) => {
    for (const dayPlan of planDays) {
      const sortedSessions = [...dayPlan.sessions].sort((a, b) => a.slotIndex - b.slotIndex);
      const needed = sortedSessions.reduce((max, session) => Math.max(max, session.slotIndex), 0);
      if (needed <= 0) continue;

      const existing = slotsByDay.get(dayPlan.day) ?? [];
      const missingCount = needed - existing.length;
      if (missingCount <= 0) continue;

      const firstStartMinutes =
        existing.length > 0 ? minutesOfUtc(existing[existing.length - 1].endTime) : 9 * 60;

      for (let i = 0; i < missingCount; i += 1) {
        const startMinutes = firstStartMinutes + i * durationMinutes;
        const endMinutes = startMinutes + durationMinutes;
        const startTime = toUtcDateWithMinutes(dayBaseDate, startMinutes);
        const endTime = toUtcDateWithMinutes(dayBaseDate, endMinutes);

        await tx.recurringSchedule.create({
          data: {
            teacherId,
            startTime,
            endTime,
            startDate: dayBaseDate,
            endDate: null,
            maxStudents: studentsPerClass,
            days: {
              create: [{ day: dayPlan.day }],
            },
          },
        });

        created.push({
          day: dayPlan.day,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        });
      }
    }
  });

  return NextResponse.json({
    success: true,
    createdCount: created.length,
    createdSlots: created,
  });
}
