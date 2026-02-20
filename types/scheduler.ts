import type { WeekDay } from "@/generated/prisma/enums";

export type { WeekDay };

export interface Student {
  id: number;
  userId: number;
  teacherId: number;
  grade: string | null;
  school: string | null;
  board?: string | null;
  fees?: number | null;
  numOfClassesPerWeek: number | null;
  createdAt?: Date;
  updatedAt?: Date;
  user: {
    firstName: string;
    lastName: string;
  };
}

export interface ScheduleSlot {
  id: number;
  teacherId?: number;
  label: string;
  startTime: string;
  endTime: string;
  maxStudents: number;
  days: WeekDay[];
  color: "blue" | "violet" | "emerald" | "amber";
}

export interface DayAssignment {
  scheduleId: number;
  day: WeekDay;
  studentId: number;
}
