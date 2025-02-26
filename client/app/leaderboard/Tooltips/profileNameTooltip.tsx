import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTasksContext } from "@/context/taskContext";
import { Trash2 } from "lucide-react";
import React from "react";
import Image from "next/image";

interface 

function profileNameTooltip({user}: User) {

        const { topUsers } = useTasksContext()
    

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Image
              src={user.image || blankImg}
              width={70}
              height={10}
              className="max-h-32 rounded-2xl"
              alt="userImg"
            />
          </TooltipTrigger>
          <TooltipContent side="bottom" className="mt-2">
            <span className="p-1 font-bold text-[12px] rounded-2xl bg-slate-100">
              Delete Task
            </span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default profileNameTooltip;
