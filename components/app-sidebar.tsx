import * as React from "react"
import {
  Brain,
  CalendarPlus,
  CalendarDays,
  CreditCard,
  GraduationCap,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Your Students",
      url: "/teacher/students",
      icon: Users,
    },
    {
      title: "Create your Schedule",
      url: "/teacher/brainstorm",
      icon: CalendarDays,
    },
    {
      title: "Generate a Schedule",
      url: "/teacher/schedule-generator",
      icon: CalendarPlus,
      isNew: true,
    },
    {
      title: "AI",
      url: "/teacher/ai-schedule-adjust",
      icon: Sparkles,
      isNew: true,
    },
    {
      title: "View your schedule",
      url: "/teacher/dashboard",
      icon: Brain,
    },
    // {
    //   title: "Chats (Coming Soon)",
    //   url: "/teacher/chats",
    // },
    {
      title: "Payments",
      url: "/teacher/payments",
      icon: CreditCard,
    },
    {
      title: "Profile",
      url: "/teacher/profile",
      icon: UserRound,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GraduationCap className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">TeamFinder</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="flex items-center gap-2 font-medium">
                    {item.icon ? <item.icon className="size-4" /> : null}
                    <span>{item.title}</span>
                    {item.isNew ? (
                      <Badge className="h-5 bg-blue-600 px-1.5 text-[10px] text-white uppercase tracking-wide hover:bg-blue-600">
                        New
                      </Badge>
                    ) : null}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
