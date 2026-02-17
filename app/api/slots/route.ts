import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const weekStart = searchParams.get("weekStart");

  if (!weekStart) {
    return NextResponse.json([], { status: 200 });
  }

  const start = new Date(weekStart);
  const end = new Date(start);
  console.log("HELLOOO");
  end.setDate(end.getDate() + 7);

  const slots = await prisma.slot.findMany({
    where: {
      startTime: {
        gte: start,
        lt: end,
      },
    },
  });

  return NextResponse.json(slots);
}
