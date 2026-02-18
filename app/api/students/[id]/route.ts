import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;   // ✅ IMPORTANT

  const body = await req.json();

  const student = await prisma.student.update({
    where: {
      id: Number(id),
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
