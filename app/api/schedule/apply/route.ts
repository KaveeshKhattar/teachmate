import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTeacherIdFromAuth } from "@/lib/get-teacher-id-from-auth";
import type { WeekDay } from "@/types/scheduler";
import type { SchedulerPlanResult } from "@/lib/ai-scheduler";

type ApplyRequestBody = {
  plan?: SchedulerPlanResult;
};

type PlanSession = {
  slotIndex: number;
  studentIds: number[];
};

type PlanDay = {
  day: WeekDay;
  sessions: PlanSession[];
};

const VALID_DAYS: WeekDay[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function isWeekDay(value: unknown): value is WeekDay {
  return typeof value === "string" && VALID_DAYS.includes(value as WeekDay);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function isPositiveInt(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value > 0;
}

function normalizePlanDays(plan: unknown): PlanDay[] {
  if (!isObject(plan) || !Array.isArray(plan.schedule)) return [];

  const normalized: PlanDay[] = [];

  for (const dayRow of plan.schedule) {
    if (!isObject(dayRow) || !isWeekDay(dayRow.day) || !Array.isArray(dayRow.sessions)) continue;

    const sessions: PlanSession[] = dayRow.sessions
      .filter((session): session is PlanSession => {
        if (!isObject(session)) return false;
        if (!isPositiveInt(session.slotIndex)) return false;
        if (!Array.isArray(session.studentIds)) return false;
        return true;
      })
      .map((session) => ({
        slotIndex: session.slotIndex,
        studentIds: session.studentIds
          .map((id) => Number(id))
          .filter((id) => Number.isInteger(id) && id > 0),
      }));

    normalized.push({ day: dayRow.day, sessions });
  }

  return normalized;
}

export async function POST(req: Request) {
  const teacherId = await getTeacherIdFromAuth();
  if (!teacherId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as ApplyRequestBody | null;
  if (!body || !body.plan) {
    return NextResponse.json({ error: "Invalid payload: plan is required" }, { status: 400 });
  }

  const planDays = normalizePlanDays(body.plan);
  if (planDays.length === 0) {
    return NextResponse.json({ error: "Plan has no valid schedule days" }, { status: 400 });
  }

  const [schedules, students] = await Promise.all([
    prisma.recurringSchedule.findMany({
      where: { teacherId },
      include: { days: { select: { day: true } } },
      orderBy: [{ startTime: "asc" }, { id: "asc" }],
    }),
    prisma.student.findMany({
      where: { teacher: { id: teacherId } },
      select: { id: true },
    }),
  ]);

  const validStudentIds = new Set(students.map((s) => s.id));
  const warnings: string[] = [];

  const slotsByDay = new Map<WeekDay, Array<{ scheduleId: number; maxStudents: number }>>();
  for (const day of VALID_DAYS) {
    const daySlots = schedules
      .filter((schedule) => schedule.days.some((d) => d.day === day))
      .map((schedule) => ({
        scheduleId: schedule.id,
        maxStudents: schedule.maxStudents,
      }));
    slotsByDay.set(day, daySlots);
  }

  const dedupe = new Set<string>();
  const assignmentsToCreate: Array<{
    recurringScheduleId: number;
    day: WeekDay;
    studentId: number;
  }> = [];
  const missingSlotDays: string[] = [];

  for (const dayPlan of planDays) {
    const daySlots = slotsByDay.get(dayPlan.day) ?? [];
    if (daySlots.length === 0) {
      missingSlotDays.push(`${dayPlan.day} requires slots, but none exist`);
      continue;
    }

    const sortedSessions = [...dayPlan.sessions].sort((a, b) => a.slotIndex - b.slotIndex);
    const maxRequestedSlot = sortedSessions.reduce(
      (max, session) => Math.max(max, session.slotIndex),
      0
    );

    if (maxRequestedSlot > daySlots.length) {
      missingSlotDays.push(
        `${dayPlan.day} requests ${maxRequestedSlot} slot(s), but only ${daySlots.length} slot(s) exist`
      );
      continue;
    }

    for (const session of sortedSessions) {
      const slot = daySlots[session.slotIndex - 1];
      if (!slot) {
        continue;
      }

      const uniqueStudentIds = [...new Set(session.studentIds)];
      const validInTeacher = uniqueStudentIds.filter((studentId) => validStudentIds.has(studentId));
      const limited = validInTeacher.slice(0, slot.maxStudents);

      if (validInTeacher.length > slot.maxStudents) {
        warnings.push(
          `${dayPlan.day} slot ${session.slotIndex} exceeded capacity (${slot.maxStudents}). Extra students were skipped.`
        );
      }

      for (const studentId of limited) {
        const key = `${slot.scheduleId}_${dayPlan.day}_${studentId}`;
        if (dedupe.has(key)) continue;
        dedupe.add(key);
        assignmentsToCreate.push({
          recurringScheduleId: slot.scheduleId,
          day: dayPlan.day,
          studentId,
        });
      }
    }
  }

  if (missingSlotDays.length > 0) {
    return NextResponse.json(
      {
        error:
          "Cannot apply plan because your recurring calendar has fewer slots than requested. Create missing slots first.",
        details: missingSlotDays,
      },
      { status: 409 }
    );
  }

  await prisma.$transaction(async (tx) => {
    await tx.recurringDayAssignment.deleteMany({
      where: {
        recurringSchedule: {
          teacherId,
        },
      },
    });

    if (assignmentsToCreate.length > 0) {
      await tx.recurringDayAssignment.createMany({
        data: assignmentsToCreate,
        skipDuplicates: true,
      });
    }
  });

  return NextResponse.json({
    success: true,
    appliedAssignments: assignmentsToCreate.map((a) => ({
      scheduleId: a.recurringScheduleId,
      day: a.day,
      studentId: a.studentId,
    })),
    appliedCount: assignmentsToCreate.length,
    warnings,
  });
}
