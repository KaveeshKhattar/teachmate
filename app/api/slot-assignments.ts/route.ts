import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slotId, studentId } = await req.json();

  const assignment = await prisma.slotAssignment.create({
    data: { slotId, studentId },
    include: { student: { include: { user: true } } },
  });

  return NextResponse.json(assignment);
}