import { auth } from "@clerk/nextjs/server";
import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            imageUrl: true,
          },
        },
      },
    });

    return NextResponse.json(teachers, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch teacher data:", error);
    return NextResponse.json({ error: "Failed to fetch teacher data" }, { status: 500 });
  }
}
