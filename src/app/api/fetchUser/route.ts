import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
) {

  const { searchParams } = new URL(req.url);
  const studentIdStr = searchParams.get("studentId");
  if (!studentIdStr) {
    return NextResponse.json({ error: "Student ID is required" }, { status: 400 });
  }
  const studentId = parseInt(studentIdStr, 10);


  if (isNaN(studentId)) {
    return NextResponse.json(
      { error: "Invalid student ID" },
      { status: 400 }
    );
  }

  try {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: { user: true },
    });

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
