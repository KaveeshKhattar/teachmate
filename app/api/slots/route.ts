import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) {
    return NextResponse.json([], { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const weekStart = searchParams.get("weekStart");

  if (!weekStart) {
    return NextResponse.json([], { status: 200 });
  }

  const start = new Date(weekStart);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);

  const user = await prisma.user.findUnique({
    where: { clerkUserId },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json([], { status: 200 });
  }

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

  let teacherId = teacher?.id ?? null;
  if (!teacherId && student?.teacherId) {
    const linkedTeacher = await prisma.teacher.findUnique({
      where: { userId: student.teacherId },
      select: { id: true },
    });
    teacherId = linkedTeacher?.id ?? null;
  }

  if (!teacherId) {
    return NextResponse.json([], { status: 200 });
  }

  const slots = await prisma.slot.findMany({
    where: {
      teacherId,
      startTime: {
        gte: start,
        lt: end,
      },
    },
    include: {
      assignments: {
        select: {
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
      },
    },
  });

  return NextResponse.json(slots);
}
