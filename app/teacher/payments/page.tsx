import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PaymentReminderButton } from "@/components/payment-reminder-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function parseYearMonth(searchParams: Record<string, string | string[] | undefined>) {
  const now = new Date();
  const fallbackYear = now.getFullYear();
  const fallbackMonth = now.getMonth() + 1;

  const yearParam = searchParams.year;
  const monthParam = searchParams.month;

  const yearValue = Array.isArray(yearParam) ? yearParam[0] : yearParam;
  const monthValue = Array.isArray(monthParam) ? monthParam[0] : monthParam;

  const year = yearValue ? Number.parseInt(yearValue, 10) : fallbackYear;
  const month = monthValue ? Number.parseInt(monthValue, 10) : fallbackMonth;

  const safeYear = Number.isInteger(year) && year >= 2000 && year <= 2100 ? year : fallbackYear;
  const safeMonth = Number.isInteger(month) && month >= 1 && month <= 12 ? month : fallbackMonth;

  return { year: safeYear, month: safeMonth };
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default async function TeacherPaymentsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) redirect("/");

  const resolvedSearchParams = await searchParams;
  const { year, month } = parseYearMonth(resolvedSearchParams);
  const current = new Date(year, month - 1, 1);
  const prev = new Date(current.getFullYear(), current.getMonth() - 1, 1);
  const next = new Date(current.getFullYear(), current.getMonth() + 1, 1);
  const prevYear = prev.getFullYear();
  const prevMonth = prev.getMonth() + 1;

  const teacher = await prisma.teacher.findFirst({
    where: { user: { clerkUserId } },
    select: {
      Student: {
        select: {
          id: true,
          fees: true,
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          payments: {
            where: {
              OR: [
                { year, month },
                { year: prevYear, month: prevMonth },
              ],
            },
            select: { paidAt: true, year: true, month: true },
          },
          reminders: {
            where: {
              OR: [
                { year, month },
                { year: prevYear, month: prevMonth },
              ],
            },
            select: {
              sentAt: true,
              year: true,
              month: true,
            },
            orderBy: { sentAt: "desc" },
          },
        },
        orderBy: { id: "asc" },
      },
    },
  });

  const students = teacher?.Student ?? [];
  const rows = students.map((student) => {
    const payment = student.payments.find((entry) => entry.year === year && entry.month === month) ?? null;
    const prevPayment =
      student.payments.find((entry) => entry.year === prevYear && entry.month === prevMonth) ?? null;
    const reminderCurrent =
      student.reminders.find((entry) => entry.year === year && entry.month === month) ?? null;

    return {
      id: student.id,
      name: [student.user.firstName, student.user.lastName].filter(Boolean).join(" ").trim() || "Student",
      email: student.user.email,
      fees: student.fees,
      paid: Boolean(payment),
      paidAt: payment?.paidAt ?? null,
      prevPaid: Boolean(prevPayment),
      lastReminderAt: reminderCurrent?.sentAt ?? null,
    };
  });

  const expectedAmount = rows.reduce((sum, row) => sum + (row.fees ?? 0), 0);
  const collectedAmount = rows.reduce((sum, row) => sum + (row.paid ? row.fees ?? 0 : 0), 0);
  const outstandingAmount = expectedAmount - collectedAmount;
  const paidCount = rows.filter((row) => row.paid).length;
  const unpaidCount = rows.length - paidCount;
  const overdueCount = rows.filter((row) => !row.prevPaid).length;
  const paidRatio = rows.length ? Math.round((paidCount / rows.length) * 100) : 0;
  const followUpRows = rows.filter((row) => !row.paid || !row.prevPaid);

  const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(current);
  const previousMonthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(prev);

  return (
    <div className="space-y-4">
      <Card className="border-primary/20">
        <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Monthly Payments</CardTitle>
            <CardDescription>Track who has paid for {monthLabel}.</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={`/teacher/payments?year=${prev.getFullYear()}&month=${prev.getMonth() + 1}`}>Previous</Link>
            </Button>
            <Badge variant="secondary" className="px-3 py-1 text-sm">
              {monthLabel}
            </Badge>
            <Button asChild variant="outline" size="sm">
              <Link href={`/teacher/payments?year=${next.getFullYear()}&month=${next.getMonth() + 1}`}>Next</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Paid</CardDescription>
              <CardTitle className="text-2xl">{paidCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Unpaid</CardDescription>
              <CardTitle className="text-2xl">{unpaidCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Completion</CardDescription>
              <CardTitle className="text-2xl">{paidRatio}%</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Collected</CardDescription>
              <CardTitle className="text-2xl">{formatCurrency(collectedAmount)}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Outstanding</CardDescription>
              <CardTitle className="text-2xl">{formatCurrency(outstandingAmount)}</CardTitle>
            </CardHeader>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Dues Follow-up</CardTitle>
          <CardDescription>
            Total expected: {formatCurrency(expectedAmount)}. {overdueCount} students are still unpaid for{" "}
            {previousMonthLabel}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {followUpRows.length === 0 ? (
            <p className="text-sm text-muted-foreground">Everyone is paid for current and previous month.</p>
          ) : (
            followUpRows.map((row) => {
              const selectedMonthDue = row.paid ? 0 : 1;
              const previousMonthDue = row.prevPaid ? 0 : 1;
              const dueAmount = (row.fees ?? 0) * (selectedMonthDue + previousMonthDue);
              const targetYear = row.paid ? prevYear : year;
              const targetMonth = row.paid ? prevMonth : month;

              return (
                <div
                  key={row.id}
                  className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">{row.name}</p>
                    <p className="text-sm text-muted-foreground">{row.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Due months: {selectedMonthDue + previousMonthDue} | Potential due: {formatCurrency(dueAmount)}
                    </p>
                  </div>
                  <PaymentReminderButton studentId={row.id} year={targetYear} month={targetMonth} />
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Student Status</CardTitle>
          <CardDescription>{rows.length} students in this billing month.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 md:hidden">
            {rows.map((row) => (
              <Card key={row.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{row.name}</CardTitle>
                  <CardDescription className="break-all">{row.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">Fees:</span> {row.fees ?? "Not set"}</p>
                  <p>
                    <span className="text-muted-foreground">Status:</span>{" "}
                    <Badge variant={row.paid ? "default" : "secondary"}>{row.paid ? "Paid" : "Unpaid"}</Badge>
                  </p>
                  <p className="text-muted-foreground">
                    {row.paidAt
                      ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(row.paidAt)
                      : "-"}
                  </p>
                  <p className="text-muted-foreground">
                    Last reminder:{" "}
                    {row.lastReminderAt
                      ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(
                          row.lastReminderAt
                        )
                      : "-"}
                  </p>
                  {!row.paid ? <PaymentReminderButton studentId={row.id} year={year} month={month} /> : null}
                </CardContent>
              </Card>
            ))}
            {rows.length === 0 ? <p className="text-center text-sm text-muted-foreground">No students found.</p> : null}
          </div>

          <div className="hidden overflow-x-auto rounded-lg border md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Monthly Fees</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Paid At</TableHead>
                  <TableHead>Last Reminder</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell className="text-muted-foreground">{row.email}</TableCell>
                    <TableCell>{row.fees != null ? row.fees : "Not set"}</TableCell>
                    <TableCell>
                      <Badge variant={row.paid ? "default" : "secondary"}>{row.paid ? "Paid" : "Unpaid"}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.paidAt
                        ? new Intl.DateTimeFormat("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          }).format(row.paidAt)
                        : "-"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.lastReminderAt
                        ? new Intl.DateTimeFormat("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          }).format(row.lastReminderAt)
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {!row.paid ? <PaymentReminderButton studentId={row.id} year={year} month={month} /> : "-"}
                    </TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No students found.
                    </TableCell>
                  </TableRow>
                ) : null}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
