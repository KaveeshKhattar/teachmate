import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthedTeacherAccess } from "@/lib/access-control";

type ReminderBody = {
  studentId?: unknown;
  year?: unknown;
  month?: unknown;
  channel?: unknown;
};

function toInt(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number.parseInt(value, 10);
    if (Number.isInteger(parsed)) return parsed;
  }
  return null;
}

function getMonthYear(inputYear?: unknown, inputMonth?: unknown) {
  const now = new Date();
  const fallbackYear = now.getFullYear();
  const fallbackMonth = now.getMonth() + 1;

  const year = toInt(inputYear) ?? fallbackYear;
  const month = toInt(inputMonth) ?? fallbackMonth;

  if (year < 2000 || year > 2100) return null;
  if (month < 1 || month > 12) return null;

  return { year, month };
}

function normalizeChannel(value: unknown): "EMAIL" | "WHATSAPP" | "MANUAL" {
  if (value === "WHATSAPP") return "WHATSAPP";
  if (value === "MANUAL") return "MANUAL";
  return "EMAIL";
}

function getMonthLabel(year: number, month: number): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, 1));
}

export async function POST(req: Request) {
  const teacherAccess = await getAuthedTeacherAccess();
  if (!teacherAccess) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as ReminderBody | null;
  const studentId = toInt(body?.studentId);
  const monthYear = getMonthYear(body?.year, body?.month);
  const channel = normalizeChannel(body?.channel);

  if (!studentId || !monthYear) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const student = await prisma.student.findFirst({
    where: {
      id: studentId,
      teacher: { id: teacherAccess.teacherId },
    },
    select: {
      id: true,
      fees: true,
      user: {
        select: {
          email: true,
          firstName: true,
          lastName: true,
        },
      },
      payments: {
        where: { year: monthYear.year, month: monthYear.month },
        select: { id: true },
        take: 1,
      },
    },
  });

  if (!student) {
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  }

  if (student.payments.length > 0) {
    return NextResponse.json({ error: "Payment already marked as paid" }, { status: 409 });
  }

  const studentName =
    [student.user.firstName, student.user.lastName].filter(Boolean).join(" ").trim() || "Student";
  const monthLabel = getMonthLabel(monthYear.year, monthYear.month);
  const amountLabel = student.fees != null ? `${student.fees}` : "the pending";
  const message = `Hi ${studentName}, this is a gentle reminder for ${monthLabel} tuition payment (${amountLabel}). Please share once completed.`;

  const reminder = await prisma.paymentReminder.create({
    data: {
      teacherId: teacherAccess.teacherId,
      studentId: student.id,
      year: monthYear.year,
      month: monthYear.month,
      channel,
      note: message,
    },
    select: {
      id: true,
      channel: true,
      sentAt: true,
      month: true,
      year: true,
    },
  });

  const mailtoUrl = `mailto:${encodeURIComponent(student.user.email)}?subject=${encodeURIComponent(`Tuition Reminder - ${monthLabel}`)}&body=${encodeURIComponent(message)}`;

  return NextResponse.json({
    success: true,
    reminder,
    message,
    mailtoUrl,
  });
}
