import { useTasksContext } from "@/context/taskContext";
import { Task } from "@/utils/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Trash2 } from "lucide-react";
import React from "react";

interface TaskProps {
    task: Task;
  }

function TrashTooltip({ task }: TaskProps) {


      const { deleteTask, getTask, updateTask, closeModal } = useTasksContext();

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Trash2
              onClick={() => {
                deleteTask(task._id);
              }}
              width={20}
              height={20}
              color="white"
              className="bg-red-500 p-[3px] hover:bg-red-600 rounded-xl cursor-pointer"
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

export default TrashTooltip;
