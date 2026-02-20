import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function getTeacherIdFromAuth(): Promise<number | null> {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return null;

  const user = await prisma.user.findUnique({
    where: { clerkUserId },
    select: { id: true },
  });

  if (!user) return null;

  const [teacher, student] = await Promise.all([
    prisma.teacher.findUnique({
      where: { userId: user.id },
      select: { id: true },
    }),
    prisma.student.findUnique({
      where: { userId: user.id },
      select: { teacherId: true },
    }),
  ]);

  if (teacher?.id) return teacher.id;
  if (!student?.teacherId) return null;

  const linkedTeacher = await prisma.teacher.findUnique({
    where: { userId: student.teacherId },
    select: { id: true },
  });

  return linkedTeacher?.id ?? null;
}
