"use client"

import { Calendar, CircleGauge, Timer, Search, Settings, ClipboardList, User2, ChevronUp, Loader, FileX, Users } from "lucide-react"
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
import { useTasksContext } from "@/context/taskContext";
import { useTimerContext } from "@/context/timerContext";
import { useTimetableContext } from "@/context/timetableContext";
import toast from "react-hot-toast";
import { useUserContext } from "@/context/userContext";



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


  const { tasks, deleteAllTasks } = useTasksContext()
  
  const { timers, deleteAllTimers } = useTimerContext()

  const { timetables, deleteAllTimetables } = useTimetableContext()

  const handleClick = () => {

    if (tasks.length == 0) {
      toast.error('There are no tasks to delete')
    } else {
      deleteAllTasks()
    }

    if (timers.length == 0) {
      toast.error('There are no timer information to delete')
    } else {
      deleteAllTimers()
    }

    if (timetables.length == 0) {
      toast.error('There are no time tables to delete')
    } else {
      deleteAllTimetables
    }


  }  

  return (
    <Sidebar variant="inset" className="bg-gray-800 text-white">
      <SidebarContent className="bg-gray-800">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg text-white">StudyHive</SidebarGroupLabel>
          <SidebarGroupContent className="mt-10">
            <SidebarMenu className="gap-5 ">
                <SidebarMenuItem >
                  <SidebarMenuButton className="h-[50px] rounded-xl border-b-2 ">
                    <Link href="/" className="flex flex-row gap-5 ml-5">
                      <CircleGauge />
                      <span>Dashboard</span>
                    </Link>
                  </SidebarMenuButton>
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
                    <Link href="/timer" className="flex flex-row gap-5 ml-5">
                        <Timer />
                        <span>Timer</span>
                      </Link>
                  </SidebarMenuButton >
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
                    <Link href="/leaderboard" className="flex flex-row gap-5 ml-5">
                        <Users />
                        <span>Leaderboard</span>
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
      <SidebarFooter  className="bg-gray-800 p-2">
          <SidebarMenu className="bg-gray-900 hover:bg-gray-800 rounded-xl p-2">
            <SidebarMenuItem className="flex ml-7 cursor-pointer " onClick={handleClick}>
                <FileX width={30} height={30} color="red"/>
                <span className="mt-1 ml-2 mb-2 text-red-500">Delete All</span>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}
