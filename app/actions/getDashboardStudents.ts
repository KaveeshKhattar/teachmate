"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import type { Student } from "@/types/scheduler";

type DashboardStudentsData = {
  students: Student[];
  assignedCountMap: Record<number, number>;
};

export async function getDashboardStudents(): Promise<DashboardStudentsData> {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    return { students: [], assignedCountMap: {} };
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
    },
  });

  if (!teacher) {
    return { students: [], assignedCountMap: {} };
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

  const assignments = await prisma.recurringDayAssignment.findMany({
    where: {
      recurringSchedule: { teacherId: teacher.id },
    },
    select: { studentId: true },
  });

  const assignedCountMap: Record<number, number> = {};
  for (const assignment of assignments) {
    assignedCountMap[assignment.studentId] = (assignedCountMap[assignment.studentId] ?? 0) + 1;
  }

  return { students, assignedCountMap };
}
