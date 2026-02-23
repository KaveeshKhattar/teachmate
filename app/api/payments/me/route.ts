import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthedStudentAccess } from "@/lib/access-control";

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
  const access = await getAuthedStudentAccess();
  return access?.studentId ?? null;
}

export async function GET(req: Request) {
  const access = await getAuthedStudentAccess();
  if (!access) {
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

  const currentDate = new Date(monthYear.year, monthYear.month - 1, 1);
  const prevDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  const prevYear = prevDate.getFullYear();
  const prevMonth = prevDate.getMonth() + 1;

  const [student, payment, prevPayment, history] = await Promise.all([
    prisma.student.findUnique({
      where: { id: access.studentId },
      select: { fees: true },
    }),
    prisma.payment.findUnique({
      where: {
        studentId_year_month: {
          studentId: access.studentId,
          year: monthYear.year,
          month: monthYear.month,
        },
      },
      select: {
        paidAt: true,
        proofUrl: true,
        proofNote: true,
      },
    }),
    prisma.payment.findUnique({
      where: {
        studentId_year_month: {
          studentId: access.studentId,
          year: prevYear,
          month: prevMonth,
        },
      },
      select: { id: true },
    }),
    prisma.payment.findMany({
      where: { studentId: access.studentId },
      orderBy: [{ year: "desc" }, { month: "desc" }],
      take: 12,
      select: {
        year: true,
        month: true,
        paidAt: true,
        proofUrl: true,
        proofNote: true,
      },
    }),
  ]);

  const paymentByMonth = new Map(
    history.map((entry) => [`${entry.year}-${entry.month}`, entry] as const)
  );
  const historyWithGaps = Array.from({ length: 12 }).map((_, index) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - index, 1);
    const itemYear = date.getFullYear();
    const itemMonth = date.getMonth() + 1;
    const entry = paymentByMonth.get(`${itemYear}-${itemMonth}`);
    return {
      year: itemYear,
      month: itemMonth,
      paidAt: entry?.paidAt ?? null,
      proofUrl: entry?.proofUrl ?? null,
      proofNote: entry?.proofNote ?? null,
    };
  });

  return NextResponse.json({
    year: monthYear.year,
    month: monthYear.month,
    paid: Boolean(payment),
    paidAt: payment?.paidAt ?? null,
    proofUrl: payment?.proofUrl ?? null,
    proofNote: payment?.proofNote ?? null,
    monthlyFee: student?.fees ?? null,
    dueAmount: payment ? 0 : student?.fees ?? null,
    previousMonthOverdue: !prevPayment,
    history: historyWithGaps,
  });
}

export async function POST(req: Request) {
  const studentId = await getAuthedStudentId();
  if (!studentId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const monthYear = getMonthYear(body?.year, body?.month);
  const proofUrl = typeof body?.proofUrl === "string" ? body.proofUrl.trim() : "";
  const proofNote = typeof body?.proofNote === "string" ? body.proofNote.trim() : "";

  const normalizedProofUrl = proofUrl.length > 0 ? proofUrl.slice(0, 512) : null;
  const normalizedProofNote = proofNote.length > 0 ? proofNote.slice(0, 500) : null;

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
    update: {
      paidAt: new Date(),
      proofUrl: normalizedProofUrl,
      proofNote: normalizedProofNote,
    },
    create: {
      studentId,
      year: monthYear.year,
      month: monthYear.month,
      paidAt: new Date(),
      proofUrl: normalizedProofUrl,
      proofNote: normalizedProofNote,
    },
    select: {
      paidAt: true,
      year: true,
      month: true,
      proofUrl: true,
      proofNote: true,
    },
  });

  return NextResponse.json({
    paid: true,
    paidAt: payment.paidAt,
    year: payment.year,
    month: payment.month,
    proofUrl: payment.proofUrl,
    proofNote: payment.proofNote,
  });
}
