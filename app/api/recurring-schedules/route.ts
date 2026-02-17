import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    return NextResponse.json([], { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json([], { status: 200 });
  }

  const teacher = await prisma.teacher.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  if (!teacher) {
    return NextResponse.json([], { status: 200 });
  }

  const schedules = await prisma.recurringSchedule.findMany({
    where: {
      teacherId: teacher.id,
    },
    include: {
      days: true,
      exceptions: true,   // ✅ IMPORTANT
    },
  });

  return NextResponse.json(schedules);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const scheduleId = searchParams.get("scheduleId");

  if (!scheduleId) {
    return NextResponse.json(
      { error: "scheduleId is required" },
      { status: 400 }
    );
  }

  const id = Number(scheduleId);

  if (Number.isNaN(id)) {
    return NextResponse.json(
      { error: "Invalid scheduleId" },
      { status: 400 }
    );
  }

  // delete exceptions first
  await prisma.recurringException.deleteMany({
    where: { recurringScheduleId: id }
  });

  // delete the schedule itself
  await prisma.recurringSchedule.delete({
    where: { id }
  });

  return NextResponse.json({ success: true });
}