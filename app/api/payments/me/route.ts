import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function getMonthYear(inputYear?: unknown, inputMonth?: unknown) {
  const now = new Date();
  const fallbackYear = now.getFullYear();
  const fallbackMonth = now.getMonth() + 1;

  const year =
    typeof inputYear === "number"
      ? inputYear
      : typeof inputYear === "string"
        ? Number.parseInt(inputYear, 10)
        : fallbackYear;

  const month =
    typeof inputMonth === "number"
      ? inputMonth
      : typeof inputMonth === "string"
        ? Number.parseInt(inputMonth, 10)
        : fallbackMonth;

  if (!Number.isInteger(year) || year < 2000 || year > 2100) {
    return { error: "Invalid year" as const };
  }

  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return { error: "Invalid month" as const };
  }

  return { year, month };
}

async function getAuthedStudentId() {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) return null;

  const student = await prisma.student.findFirst({
    where: { user: { clerkUserId } },
    select: { id: true },
  });

  return student?.id ?? null;
}

export async function GET(req: Request) {
  const studentId = await getAuthedStudentId();
  if (!studentId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const monthYear = getMonthYear(
    searchParams.get("year"),
    searchParams.get("month")
  );

  if ("error" in monthYear) {
    return NextResponse.json({ error: monthYear.error }, { status: 400 });
  }

  const payment = await prisma.payment.findUnique({
    where: {
      studentId_year_month: {
        studentId,
        year: monthYear.year,
        month: monthYear.month,
      },
    },
    select: {
      paidAt: true,
    },
  });

  return NextResponse.json({
    year: monthYear.year,
    month: monthYear.month,
    paid: Boolean(payment),
    paidAt: payment?.paidAt ?? null,
  });
}

export async function POST(req: Request) {
  const studentId = await getAuthedStudentId();
  if (!studentId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const monthYear = getMonthYear(body?.year, body?.month);

  if ("error" in monthYear) {
    return NextResponse.json({ error: monthYear.error }, { status: 400 });
  }

  const payment = await prisma.payment.upsert({
    where: {
      studentId_year_month: {
        studentId,
        year: monthYear.year,
        month: monthYear.month,
      },
    },
    update: { paidAt: new Date() },
    create: {
      studentId,
      year: monthYear.year,
      month: monthYear.month,
      paidAt: new Date(),
    },
    select: {
      paidAt: true,
      year: true,
      month: true,
    },
  });

  return NextResponse.json({
    paid: true,
    paidAt: payment.paidAt,
    year: payment.year,
    month: payment.month,
  });
}
