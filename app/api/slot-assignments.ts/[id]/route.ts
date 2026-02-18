import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.slotAssignment.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
