"use client"

import { Calendar, CircleGauge, Timer, Search, Settings, ClipboardList, User2, ChevronUp } from "lucide-react"

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

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: CircleGauge,
  },
  {
    title: "Timer",
    url: "#",
    icon: Timer,
  },
  {
    title: "Tasks",
    url: "#",
    icon: ClipboardList,
  },
  {
    title: "Time table",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function SideBar() {
  return (
    <SidebarProvider>
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>StudyHive</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem className="flex ">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" className="w-[70px]"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <UserProfile />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
    </SidebarProvider>
  )
}
