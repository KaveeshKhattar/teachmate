"use server";

import prisma from '../../lib/prisma';
import { auth } from "@clerk/nextjs/server";
import { WeekDay } from "../../app/generated/prisma";

const DAY_MAP: Record<string, WeekDay> = {
  Monday: "MON",
  Tuesday: "TUE",
  Wednesday: "WED",
  Thursday: "THU",
  Friday: "FRI",
  Saturday: "SAT",
  Sunday: "SUN",
};

type Input = {
  startTime: string;   // "09:00"
  endTime: string;     // "10:00"
  startDate: string;   // "2026-02-17"
  endDate?: string;    // optional
  days: string[];
  maxStudents: number;
};

function combine(date: string, time: string) {
  return new Date(`${date}T${time}:00`);
}

export async function createRecurringSchedule(input: Input) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthenticated");
  }

  const teacher = await prisma.teacher.findFirst({
    where: {
      user: {
        clerkUserId: userId,
      },
    },
    select: { id: true },
  });

  if (!teacher) {
    throw new Error("Teacher not found");
  }

  const {
    startTime,
    endTime,
    startDate,
    endDate,
    days,
    maxStudents,
  } = input;

  if (!startTime || !endTime || !startDate || days.length === 0) {
    throw new Error("Invalid input");
  }

  const startDateTime = combine(startDate, startTime);
  const endDateTime = combine(startDate, endTime);

  return prisma.recurringSchedule.create({
    data: {
      teacherId: teacher.id,
      startTime: startDateTime,
      endTime: endDateTime,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      maxStudents,
      days: {
        create: days.map((d) => ({
          day: DAY_MAP[d],
        })),
      },
    },
    include: {
      days: true,
    },
  });
}
