import React from "react";
import { redirect } from "next/navigation";
import { StudentAppSidebar } from "@/components/student-app-sidebar";
import { Separator } from "@/components/ui/separator";
import { getAuthedAccessContext } from "@/lib/access-control";
import { StudentNotificationBell } from "@/components/student-notification-bell";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const access = await getAuthedAccessContext();
  if (!access) redirect("/");

  if (access.role !== "STUDENT") {
    if (access.role === "TEACHER") redirect("/teacher/dashboard");
    redirect("/onboarding");
  }

  if (!access.entitled) {
    redirect("/onboarding?access=required");
  }

  return (
    <SidebarProvider>
      <StudentAppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex w-full items-center justify-between gap-2 px-3">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>
            <StudentNotificationBell />
          </div>
        </header>
        <div className="flex min-h-0 flex-1 flex-col gap-4 p-3 sm:p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
