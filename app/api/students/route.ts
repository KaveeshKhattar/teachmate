// app/api/students/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const clerkUserId = searchParams.get("clerkUserId"); // from Clerk

  if (!clerkUserId) {
    return NextResponse.json({ error: "Missing clerkUserId" }, { status: 400 });
  }

  // 1️⃣ Get User.id from clerkUserId
  const user = await prisma.user.findUnique({
    where: { clerkUserId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // 2️⃣ Get Teacher by user.id
  const teacher = await prisma.teacher.findUnique({
    where: { userId: user.id },
    include: {
      Student: {
        include: {
          user: true, // get student's email, firstName, lastName
        },
      },
    },
  });

  if (!teacher) {
    return NextResponse.json({ error: "Teacher record not found" }, { status: 404 });
  }

  // 3️⃣ Return all students for this teacher
  return NextResponse.json(teacher.Student);
}
