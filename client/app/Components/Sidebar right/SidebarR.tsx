"use client"

import { Calendar, CircleGauge, Timer, Search, Settings, ClipboardList, User2, ChevronUp } from "lucide-react"
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
import User from "./Components/User";
import LogoutButton from "./Components/LogoutButton";
import { useUserContext } from "@/context/userContext";



// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: CircleGauge,
  },
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

export function SideBarR() {

  return (
    <Sidebar variant="inset" side="right">
      <SidebarContent className="bg-[#f3f8ff]">
        <UserProfile />
      </SidebarContent>
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem className="flex ">
              <LogoutButton/>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}
