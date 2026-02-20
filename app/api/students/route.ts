// app/api/students/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTeacherIdFromAuth } from "@/lib/get-teacher-id-from-auth";

export async function GET() {
  const teacherId = await getTeacherIdFromAuth();
  if (!teacherId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const students = await prisma.student.findMany({
    where: {
      teacher: {
        id: teacherId,
      },
    },
    include: {
      user: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: { id: "asc" },
  });

  return NextResponse.json(students);
}
