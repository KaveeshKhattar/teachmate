"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import type { DayAssignment, ScheduleSlot, Student } from "@/types/scheduler";

const SLOT_COLORS: ScheduleSlot["color"][] = ["blue", "violet", "emerald", "amber"];

function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

function toUtcHHmm(date: Date): string {
  return `${pad2(date.getUTCHours())}:${pad2(date.getUTCMinutes())}`;
}

function buildLabel(startTime: Date): string {
  const hour = startTime.getUTCHours();
  if (hour < 12) return "Morning Session";
  if (hour < 17) return "Afternoon Session";
  return "Evening Session";
}

type BrainstormData = {
  students: Student[];
  schedules: ScheduleSlot[];
  assignments: DayAssignment[];
};

export async function getBrainstormData(): Promise<BrainstormData> {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    return { students: [], schedules: [], assignments: [] };
  }

  const teacher = await prisma.teacher.findFirst({
    where: { user: { clerkUserId } },
    select: {
      id: true,
      Student: {
        include: {
          user: {
            select: { firstName: true, lastName: true },
          },
        },
        orderBy: { id: "asc" },
      },
      recurringSchedules: {
        include: {
          days: { select: { day: true } },
          recurringDayAssignments: {
            select: { recurringScheduleId: true, day: true, studentId: true },
          },
        },
        orderBy: { startTime: "asc" },
      },
    },
  });

  if (!teacher) {
    return { students: [], schedules: [], assignments: [] };
  }

  const students: Student[] = teacher.Student.map((student) => ({
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

  const schedules: ScheduleSlot[] = teacher.recurringSchedules.map((schedule, index) => ({
    id: schedule.id,
    teacherId: schedule.teacherId,
    label: buildLabel(schedule.startTime),
    startTime: toUtcHHmm(schedule.startTime),
    endTime: toUtcHHmm(schedule.endTime),
    maxStudents: schedule.maxStudents,
    days: schedule.days.map((d) => d.day),
    color: SLOT_COLORS[index % SLOT_COLORS.length],
  }));

  const assignments: DayAssignment[] = teacher.recurringSchedules.flatMap((schedule) =>
    schedule.recurringDayAssignments.map((assignment) => ({
      scheduleId: assignment.recurringScheduleId,
      day: assignment.day,
      studentId: assignment.studentId,
    }))
  );

  return { students, schedules, assignments };
}
