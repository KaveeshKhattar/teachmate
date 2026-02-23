import Link from "next/link";
import { Bell } from "lucide-react";
import prisma from "@/lib/prisma";
import { getAuthedStudentAccess } from "@/lib/access-control";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export async function StudentNotificationBell() {
  const access = await getAuthedStudentAccess();
  if (!access) return null;

  const unreadCount = await prisma.studentNotification.count({
    where: {
      studentId: access.studentId,
      readAt: null,
    },
  });

  return (
    <Button asChild variant="ghost" size="icon" className="relative">
      <Link href="/student/notifications" aria-label="Notifications">
        <Bell className="size-4" />
        {unreadCount > 0 ? (
          <Badge className="absolute -right-1 -top-1 h-5 min-w-5 px-1 text-[10px]">
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        ) : null}
      </Link>
    </Button>
  );
}
