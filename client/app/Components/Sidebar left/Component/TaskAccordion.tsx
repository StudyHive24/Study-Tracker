import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { CircleGauge, CirclePlus, ClipboardList, ClipboardMinus, ClipboardPlus, FilePenLine, View } from "lucide-react"
import Link from "next/link"
  
  export function TaskAccordion() {
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
                <Link href="/tasks/add-tasks" className="flex flex-row gap-5 ml-8">
                    <View width={20} height={20}/>
                    <span className="text-[13px]">View Tasks</span>
                </Link>
            </SidebarMenuButton >
            <SidebarMenuButton className="h-[50px] rounded-xl border-b-2 ">
                <Link href="/tasks/add-tasks" className="flex flex-row gap-5 ml-8">
                    <ClipboardPlus width={20} height={20}/>
                    <span className="text-[13px]">Add Tasks</span>
                </Link>
            </SidebarMenuButton >
            <SidebarMenuButton className="h-[50px] rounded-xl border-b-2 ">
                <Link href="/tasks/remove-tasks" className="flex flex-row gap-5 ml-8">
                    <ClipboardMinus width={20} height={20}/>
                    <span className="text-[13px]">Remove Tasks</span>
                </Link>
            </SidebarMenuButton >
            <SidebarMenuButton className="h-[50px] rounded-xl border-b-2 ">
                <Link href="/tasks/edit-tasks" className="flex flex-row gap-5 ml-8">
                    <FilePenLine width={20} height={20}/>
                    <span className="text-[13px]">Edit Tasks</span>
                </Link>
            </SidebarMenuButton >
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
  