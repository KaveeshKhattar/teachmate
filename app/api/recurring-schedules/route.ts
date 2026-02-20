import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { getTeacherIdFromAuth } from "@/lib/get-teacher-id-from-auth";

export async function GET() {
  const teacherId = await getTeacherIdFromAuth();

  if (!teacherId) {
    return NextResponse.json([], { status: 401 });
  }

  const schedules = await prisma.recurringSchedule.findMany({
    where: {
      teacherId,
    },
    include: {
      days: true,
      exceptions: {
        select: {
          date: true,
          startTime: true,  // ← include these
          endTime: true,
        },
      },
      recurringDayAssignments: {
        select: {
          day: true,
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


type PatchBody = {
  scheduleId: number;
  startDate: string; // yyyy-mm-dd
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  days: ("MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN")[];
};

function combineDateAndTime(date: string, time: string) {
  return new Date(`${date}T${time}:00Z`); // ← add Z
}

type WeekDayType = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export async function PATCH(req: Request) {
  let body: PatchBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { scheduleId, startDate, startTime, endTime, days } = body;

  if (!scheduleId || !startDate || !startTime || !endTime || !days?.length) {
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400 }
    );
  }

  try {
    await prisma.$transaction(async (tx) => {
      // 1. update main schedule
      await tx.recurringSchedule.update({
        where: { id: scheduleId },
        data: {
          startDate: new Date(startDate),
          startTime: combineDateAndTime(startDate, startTime),
          endTime: combineDateAndTime(startDate, endTime),
        },
      });

      // 2. replace days
      await tx.recurringDay.deleteMany({
        where: { recurringScheduleId: scheduleId },
      });

      await tx.recurringDay.createMany({
        data: days.map((d) => ({
          recurringScheduleId: scheduleId,
          day: d as WeekDayType,
        })),
      });
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { error: "Failed to update recurring schedule" },
      { status: 500 }
    );
  }
}
