"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type StudentNotification = {
  id: number;
  type: "SCHEDULE_CHANGE" | "PAYMENT" | "GENERAL";
  title: string;
  message: string;
  relatedDate: string | null;
  readAt: string | null;
  createdAt: string;
};

type NotificationResponse = {
  unreadCount: number;
  notifications: StudentNotification[];
};

export default function StudentNotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);
  const [data, setData] = useState<NotificationResponse>({
    unreadCount: 0,
    notifications: [],
  });

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notifications/me?limit=50");
      if (!res.ok) throw new Error("Failed");
      const payload = (await res.json()) as NotificationResponse;
      setData(payload);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const markRead = async (id: number) => {
    const res = await fetch("/api/notifications/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setData((prev) => ({
        unreadCount: Math.max(0, prev.unreadCount - 1),
        notifications: prev.notifications.map((item) =>
          item.id === id ? { ...item, readAt: new Date().toISOString() } : item
        ),
      }));
    }
  };

  const markAllRead = async () => {
    setMarkingAll(true);
    try {
      const res = await fetch("/api/notifications/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markAll: true }),
      });
      if (res.ok) {
        const now = new Date().toISOString();
        setData((prev) => ({
          unreadCount: 0,
          notifications: prev.notifications.map((item) => ({ ...item, readAt: item.readAt ?? now })),
        }));
      }
    } finally {
      setMarkingAll(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <Card className="border-primary/20">
        <CardHeader className="gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Stay updated when your teacher changes your schedule.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={data.unreadCount > 0 ? "default" : "secondary"}>
              {data.unreadCount} unread
            </Badge>
            <Button variant="outline" size="sm" disabled={markingAll || data.unreadCount === 0} onClick={markAllRead}>
              {markingAll ? "Marking..." : "Mark all read"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? <p className="text-sm text-muted-foreground">Loading notifications...</p> : null}
          {!loading && data.notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">No notifications yet.</p>
          ) : null}
          {data.notifications.map((notification) => (
            <div key={notification.id} className="rounded-lg border p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(
                      new Date(notification.createdAt)
                    )}
                  </p>
                </div>
                {notification.readAt ? (
                  <Badge variant="secondary">Read</Badge>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => markRead(notification.id)}>
                    Mark Read
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
