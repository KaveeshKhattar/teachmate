"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  studentId: number;
  year: number;
  month: number;
  size?: "default" | "sm" | "lg" | "icon";
};

type ReminderResponse = {
  mailtoUrl?: string;
};

export function PaymentReminderButton({
  studentId,
  year,
  month,
  size = "sm",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const sendReminder = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/payments/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, year, month, channel: "EMAIL" }),
      });

      if (!res.ok) {
        setSent(false);
        return;
      }

      const payload = (await res.json()) as ReminderResponse;
      setSent(true);

      if (payload.mailtoUrl) {
        window.location.href = payload.mailtoUrl;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      size={size}
      variant="outline"
      disabled={loading}
      onClick={sendReminder}
    >
      {loading ? "Sending..." : sent ? "Reminder Sent" : "Send Reminder"}
    </Button>
  );
}
