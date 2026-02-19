"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type PaymentStatus = {
  year: number;
  month: number;
  paid: boolean;
  paidAt: string | null;
};

export default function StudentPaymentsPage() {
  const now = useMemo(() => new Date(), []);
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(now),
    [now]
  );

  const loadStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/payments/me?year=${year}&month=${month}`);
      if (!res.ok) throw new Error("Failed to load payment status");
      const data: PaymentStatus = await res.json();
      setStatus(data);
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
        body: JSON.stringify({ year, month }),
      });

      if (!res.ok) throw new Error("Failed to mark as paid");

      const data: PaymentStatus = await res.json();
      setStatus(data);
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
    <div className="mx-auto w-full max-w-2xl space-y-4">
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Monthly Payment</span>
            <Badge variant={status?.paid ? "default" : "secondary"}>
              {status?.paid ? "Paid" : "Unpaid"}
            </Badge>
          </CardTitle>
          <CardDescription>
            Confirm your tuition payment for <span className="font-medium text-foreground">{monthLabel}</span>.
          </CardDescription>
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
          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <Button onClick={markPaid} disabled={loading || submitting || Boolean(status?.paid)}>
            {status?.paid ? "Payment Confirmed" : submitting ? "Saving..." : "Mark as Paid"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Need to check schedule?</CardTitle>
          <CardDescription>Go back to your classes dashboard anytime.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline">
            <Link href="/student/dashboard">Back to dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
