import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

export default async function TeacherPaymentsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) redirect("/");

  const resolvedSearchParams = await searchParams;
  const { year, month } = parseYearMonth(resolvedSearchParams);

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
            where: { year, month },
            select: { paidAt: true },
            take: 1,
          },
        },
        orderBy: { id: "asc" },
      },
    },
  });

  const students = teacher?.Student ?? [];
  const rows = students.map((student) => {
    const payment = student.payments[0] ?? null;
    return {
      id: student.id,
      name: [student.user.firstName, student.user.lastName].filter(Boolean).join(" ").trim() || "Student",
      email: student.user.email,
      fees: student.fees,
      paid: Boolean(payment),
      paidAt: payment?.paidAt ?? null,
    };
  });

  const paidCount = rows.filter((row) => row.paid).length;
  const unpaidCount = rows.length - paidCount;
  const paidRatio = rows.length ? Math.round((paidCount / rows.length) * 100) : 0;

  const current = new Date(year, month - 1, 1);
  const prev = new Date(current.getFullYear(), current.getMonth() - 1, 1);
  const next = new Date(current.getFullYear(), current.getMonth() + 1, 1);
  const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(current);

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
        <CardContent className="grid gap-3 sm:grid-cols-3">
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
                  </TableRow>
                ))}
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
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
