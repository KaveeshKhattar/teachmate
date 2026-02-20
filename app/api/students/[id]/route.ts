import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTeacherIdFromAuth } from "@/lib/get-teacher-id-from-auth";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const teacherId = await getTeacherIdFromAuth();
  if (!teacherId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const studentId = Number(id);
  if (!Number.isInteger(studentId)) {
    return NextResponse.json({ error: "Invalid student id" }, { status: 400 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const ownedStudent = await prisma.student.findFirst({
    where: {
      id: studentId,
      teacher: { id: teacherId },
    },
    select: { id: true },
  });

  if (!ownedStudent) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  const student = await prisma.student.update({
    where: {
      id: studentId,
    },
    data: {
      fees: body.fees,
      numOfClassesPerWeek: body.numOfClassesPerWeek,
    },
    include: {
      user: true,
    },
  });

  return NextResponse.json(student);
}

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const teacherId = await getTeacherIdFromAuth();
  if (!teacherId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const studentId = Number(id);
  if (!Number.isInteger(studentId)) {
    return NextResponse.json({ error: "Invalid student id" }, { status: 400 });
  }

  const ownedStudent = await prisma.student.findFirst({
    where: {
      id: studentId,
      teacher: { id: teacherId },
    },
    select: { id: true },
  });

  if (!ownedStudent) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  await prisma.student.delete({
    where: { id: studentId },
  });

  return NextResponse.json({ success: true });
}
