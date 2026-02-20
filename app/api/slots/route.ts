import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTeacherIdFromAuth } from "@/lib/get-teacher-id-from-auth";

export async function GET(req: NextRequest) {
  const teacherId = await getTeacherIdFromAuth();
  if (!teacherId) {
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
