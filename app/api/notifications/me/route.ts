import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthedStudentAccess } from "@/lib/access-control";

function toInt(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number.parseInt(value, 10);
    if (Number.isInteger(parsed)) return parsed;
  }
  return null;
}

export async function GET(req: Request) {
  const access = await getAuthedStudentAccess();
  if (!access) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = Math.min(Math.max(toInt(searchParams.get("limit")) ?? 20, 1), 100);

  const [notifications, unreadCount] = await Promise.all([
    prisma.studentNotification.findMany({
      where: { studentId: access.studentId },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        type: true,
        title: true,
        message: true,
        relatedDate: true,
        readAt: true,
        createdAt: true,
      },
    }),
    prisma.studentNotification.count({
      where: { studentId: access.studentId, readAt: null },
    }),
  ]);

  return NextResponse.json({
    unreadCount,
    notifications,
  });
}

export async function PATCH(req: Request) {
  const access = await getAuthedStudentAccess();
  if (!access) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as
    | { id?: unknown; markAll?: unknown }
    | null;

  if (body?.markAll === true) {
    const result = await prisma.studentNotification.updateMany({
      where: {
        studentId: access.studentId,
        readAt: null,
      },
      data: { readAt: new Date() },
    });

    return NextResponse.json({ success: true, updated: result.count });
  }

  const id = toInt(body?.id);
  if (!id) {
    return NextResponse.json({ error: "Notification id is required" }, { status: 400 });
  }

  const notification = await prisma.studentNotification.findFirst({
    where: { id, studentId: access.studentId },
    select: { id: true },
  });

  if (!notification) {
    return NextResponse.json({ error: "Notification not found" }, { status: 404 });
  }

  await prisma.studentNotification.update({
    where: { id },
    data: { readAt: new Date() },
  });

  return NextResponse.json({ success: true, id });
}
