import React from "react"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

type RoleMetadata = {
  ROLE?: string
  role?: string
}

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId } = await auth()
  if (!userId) redirect("/")

  const user = await currentUser()
  const metadata = (user?.unsafeMetadata ?? {}) as RoleMetadata
  const role = metadata.role ?? metadata.ROLE

  if (role !== "TEACHER") {
    if (role === "STUDENT") redirect("/student/dashboard")
    redirect("/onboarding")
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="flex flex-1 min-h-0 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
