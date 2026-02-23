import prisma from "@/lib/prisma";
import type { WeekDay } from "@/types/scheduler";

function dayLabel(day: WeekDay): string {
  const map: Record<WeekDay, string> = {
    MON: "Monday",
    TUE: "Tuesday",
    WED: "Wednesday",
    THU: "Thursday",
    FRI: "Friday",
    SAT: "Saturday",
    SUN: "Sunday",
  };
  return map[day];
}

function dateToWeekDay(date: Date): WeekDay {
  const labels: WeekDay[] = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return labels[date.getUTCDay()];
}

export async function notifyScheduleStudents(
  teacherId: number,
  scheduleId: number,
  title: string,
  message: string
) {
  const assignments = await prisma.recurringDayAssignment.findMany({
    where: {
      recurringScheduleId: scheduleId,
      recurringSchedule: { teacherId },
    },
    select: { studentId: true },
    distinct: ["studentId"],
  });

  if (assignments.length === 0) return;

  await prisma.studentNotification.createMany({
    data: assignments.map((assignment) => ({
      studentId: assignment.studentId,
      type: "SCHEDULE_CHANGE",
      title,
      message,
    })),
  });
}

export async function notifyScheduleStudentsForDate(
  teacherId: number,
  scheduleId: number,
  occurrenceDate: Date,
  title: string,
  message: string
) {
  const weekDay = dateToWeekDay(occurrenceDate);

  const assignments = await prisma.recurringDayAssignment.findMany({
    where: {
      recurringScheduleId: scheduleId,
      day: weekDay,
      recurringSchedule: { teacherId },
    },
    select: { studentId: true },
    distinct: ["studentId"],
  });

  if (assignments.length === 0) return;

  await prisma.studentNotification.createMany({
    data: assignments.map((assignment) => ({
      studentId: assignment.studentId,
      type: "SCHEDULE_CHANGE",
      title,
      message,
      relatedDate: occurrenceDate,
    })),
  });
}

export async function notifySingleStudentScheduleChange(
  studentId: number,
  title: string,
  message: string
) {
  await prisma.studentNotification.create({
    data: {
      studentId,
      type: "SCHEDULE_CHANGE",
      title,
      message,
    },
  });
}

export function buildAssignmentMessage(day: WeekDay, action: "added" | "removed") {
  const readableDay = dayLabel(day);
  if (action === "added") {
    return `You were added to a recurring class on ${readableDay}.`;
  }
  return `You were removed from a recurring class on ${readableDay}.`;
}
