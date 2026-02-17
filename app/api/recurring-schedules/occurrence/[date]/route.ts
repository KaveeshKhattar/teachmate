import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ date: string }> }
) {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { date } = await params; // ✅ must await params

  const { searchParams } = new URL(req.url);
  const scheduleId = searchParams.get("scheduleId");

  if (!scheduleId) {
    return NextResponse.json(
      { error: "scheduleId missing" },
      { status: 400 }
    );
  }

  // ✅ DO NOT decodeURIComponent here
  const occurrenceDate = new Date(date);

  if (isNaN(occurrenceDate.getTime())) {
    return NextResponse.json(
      { error: "Invalid date" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId },
    select: { id: true },
  });

  if (!user) return NextResponse.json({}, { status: 200 });

  const teacher = await prisma.teacher.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  if (!teacher) return NextResponse.json({}, { status: 200 });

  await prisma.recurringException.create({
    data: {
      recurringScheduleId: Number(scheduleId),
      date: occurrenceDate,
    },
  });

  return NextResponse.json({ ok: true });
}
