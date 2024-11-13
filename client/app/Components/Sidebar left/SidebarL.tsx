"use client"

import { Calendar, CircleGauge, Timer, Search, Settings, ClipboardList, User2, ChevronUp, Loader } from "lucide-react"
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Button } from "@/components/ui/button"
import { UserProfile } from "../User-Profile/UserProfile"
import { TaskAccordion } from "./Component/TaskAccordion";



// Menu items.
const items = [

  {
    title: "Timer",
    url: "/timer",
    icon: Timer,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: ClipboardList,
  },
  {
    title: "Time table",
    url: "/time-table",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function SideBarL() {
  return (
    <Sidebar variant="inset">
      <SidebarContent className="bg-[#f3f8ff]">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg">StudyHive</SidebarGroupLabel>
          <SidebarGroupContent className="mt-10">
            <SidebarMenu className="gap-5 ">
                <SidebarMenuItem >
                  <SidebarMenuButton className="h-[50px] rounded-xl border-b-2 ">
                    <Link href="/dashboard" className="flex flex-row gap-5 ml-5">
                      <CircleGauge />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                  <SidebarMenuButton className="h-[50px] rounded-xl border-b-2 ">
                    <Link href="/timer" className="flex flex-row gap-5 ml-5">
                        <Timer />
                        <span>Timer</span>
                      </Link>
                  </SidebarMenuButton >
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <TaskAccordion/>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                  <SidebarMenuButton className="h-[50px] rounded-xl border-b-2 ">
                    <Link href="/time-table" className="flex flex-row gap-5 ml-5">
                        <Calendar />
                        <span>Time Table</span>
                      </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="h-[50px] rounded-xl border-b-2 ">
                    <Link href="/progress" className="flex flex-row gap-5 ml-5">
                        <Loader />
                        <span>Progress</span>
                      </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="h-[50px] rounded-xl border-b-2 ">
                    <Link href="/settings" className="flex flex-row gap-5 ml-5">
                        <Settings />
                        <span>Settings</span>
                      </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem className="flex ">
                
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}
