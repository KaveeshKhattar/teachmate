"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type PaymentStatus = {
  year: number;
  month: number;
  paid: boolean;
  paidAt: string | null;
  proofUrl: string | null;
  proofNote: string | null;
  monthlyFee: number | null;
  dueAmount: number | null;
  previousMonthOverdue: boolean;
  history: Array<{
    year: number;
    month: number;
    paidAt: string | null;
    proofUrl: string | null;
    proofNote: string | null;
  }>;
};

export default function StudentPaymentsPage() {
  const now = useMemo(() => new Date(), []);
  const [selectedDate, setSelectedDate] = useState(() => new Date(now.getFullYear(), now.getMonth(), 1));

  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [proofUrl, setProofUrl] = useState("");
  const [proofNote, setProofNote] = useState("");

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;

  const prevDate = useMemo(
    () => new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1),
    [selectedDate]
  );
  const nextDate = useMemo(
    () => new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1),
    [selectedDate]
  );

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);

  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(selectedDate),
    [selectedDate]
  );

  const loadStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/payments/me?year=${year}&month=${month}`);
      if (!res.ok) throw new Error("Failed to load payment status");
      const data: PaymentStatus = await res.json();
      setStatus(data);
      setProofUrl(data.proofUrl ?? "");
      setProofNote(data.proofNote ?? "");
    } catch {
      setError("Unable to load your payment status right now.");
    } finally {
      setLoading(false);
    }
  }, [month, year]);

  useEffect(() => {
    void loadStatus();
  }, [loadStatus]);

  const markPaid = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/payments/me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ year, month, proofUrl, proofNote }),
      });

      if (!res.ok) throw new Error("Failed to mark as paid");

      const data: PaymentStatus = await res.json();
      await loadStatus();
      setStatus((prev) => (prev ? { ...prev, ...data, paid: true } : prev));
    } catch {
      setError("Could not mark payment as paid. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const paidAtLabel =
    status?.paidAt != null
      ? new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(status.paidAt))
      : null;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4">
      <Card className="border-primary/20">
        <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span>Payment Center</span>
              <Badge variant={status?.paid ? "default" : "secondary"}>{status?.paid ? "Paid" : "Unpaid"}</Badge>
            </CardTitle>
            <CardDescription>
              Manage your tuition status for <span className="font-medium text-foreground">{monthLabel}</span>.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => setSelectedDate(prevDate)}>
              Previous
            </Button>
            <Button size="sm" variant="outline" onClick={() => setSelectedDate(nextDate)}>
              Next
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Monthly Fee</CardDescription>
              <CardTitle className="text-2xl">
                {status?.monthlyFee != null ? formatCurrency(status.monthlyFee) : "Not set"}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Due Status</CardDescription>
              <CardTitle className="text-2xl">
                {status?.dueAmount != null ? formatCurrency(status.dueAmount) : "-"}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Previous Month</CardDescription>
              <CardTitle className="text-2xl">
                {status?.previousMonthOverdue ? "Overdue" : "Clear"}
              </CardTitle>
            </CardHeader>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Payment Proof</span>
          </CardTitle>
          <CardDescription>Add a receipt link or reference when marking payment as paid.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {loading ? <p className="text-sm text-muted-foreground">Loading payment status...</p> : null}
          {!loading && paidAtLabel ? (
            <p className="text-sm text-muted-foreground">Marked as paid on {paidAtLabel}</p>
          ) : null}
          {!loading && !status?.paid ? (
            <p className="text-sm text-muted-foreground">
              Once you have paid this month, click the button below so your teacher can see it immediately.
            </p>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="proofUrl">Receipt URL (optional)</Label>
            <Input
              id="proofUrl"
              placeholder="https://..."
              value={proofUrl}
              onChange={(e) => setProofUrl(e.target.value)}
              disabled={Boolean(status?.paid)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="proofNote">Transaction Reference / Note (optional)</Label>
            <Input
              id="proofNote"
              placeholder="UPI Ref / bank txn id / note"
              value={proofNote}
              onChange={(e) => setProofNote(e.target.value)}
              disabled={Boolean(status?.paid)}
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <Button onClick={markPaid} disabled={loading || submitting || Boolean(status?.paid)}>
            {status?.paid ? "Payment Confirmed" : submitting ? "Saving..." : "Mark as Paid"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment History</CardTitle>
          <CardDescription>Your last 12 payment records and proof details.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Paid At</TableHead>
                  <TableHead>Proof</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {status?.history?.map((item) => (
                  <TableRow key={`${item.year}-${item.month}`}>
                    <TableCell>
                      {new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(
                        new Date(item.year, item.month - 1, 1)
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.paidAt ? "default" : "secondary"}>{item.paidAt ? "Paid" : "Unpaid"}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.paidAt
                        ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(
                            new Date(item.paidAt)
                          )
                        : "-"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.proofUrl ? (
                        <a href={item.proofUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                          Receipt Link
                        </a>
                      ) : item.proofNote ? (
                        item.proofNote
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {status?.history?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No payment records yet.
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
