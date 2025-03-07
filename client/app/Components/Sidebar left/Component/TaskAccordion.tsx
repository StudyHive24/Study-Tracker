"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import {
  CircleGauge,
  CirclePlus,
  ClipboardList,
  ClipboardMinus,
  ClipboardPlus,
  FilePenLine,
  View,
  LayoutList,
  ClipboardCheck,
  ClockAlert,
  Clock9,
} from "lucide-react";
import Link from "next/link";

export function TaskAccordion() {
  // local state to track whether the component has mounted
  const [isMounted, setIsMounted] = useState(false);

  // set isMounted to true after the component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // prevent rendering until the component has mounted on the client side
  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex flex-row gap-5 ml-7">
            <ClipboardList />
            <span>Tasks</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <SidebarMenuButton className="h-[50px] rounded-xl border-b-2 ">
            <Link href="/tasks/all-tasks" className="flex flex-row gap-5 ml-8">
              <LayoutList width={20} height={20} />
              <span className="text-[13px]">All Tasks</span>
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton className="h-[50px] rounded-xl border-b-2 ">
            <Link
              href="/tasks/completed-tasks"
              className="flex flex-row gap-5 ml-8"
            >
              <ClipboardCheck width={20} height={20} />
              <span className="text-[13px]">Completed Tasks</span>
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton className="h-[50px] rounded-xl border-b-2 ">
            <Link
              href="/tasks/pending-tasks"
              className="flex flex-row gap-5 ml-8"
            >
              <Clock9 width={20} height={20} />
              <span className="text-[13px]">Pending Tasks</span>
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton className="h-[50px] rounded-xl border-b-2 ">
            <Link
              href="/tasks/overdue-tasks"
              className="flex flex-row gap-5 ml-8"
            >
              <ClockAlert width={20} height={20} />
              <span className="text-[13px]">Overdue Tasks</span>
            </Link>
          </SidebarMenuButton>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
