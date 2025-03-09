'use client'
import React, { useState, useEffect } from 'react';
import { useTasksContext } from "@/context/taskContext";
import { Task } from "@/utils/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Star } from 'lucide-react';

interface TaskProps {
  task: Task;
}

function CompletedTooltip({ task }: TaskProps) {
  const { updateTask } = useTasksContext();
  const [isMounted, setIsMounted] = useState(false);

  // Set state to true after the component mounts on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = () => {
    // check the completion status of the task
    if (task.completed === 'no') {
      updateTask({ ...task, completed: 'yes' });
    } else if (task.completed === 'yes') {
      updateTask({ ...task, completed: 'no' });
    }
  };

  let completedStatus = '';

  if (task.completed === 'yes') {
    completedStatus = 'Completed';
  } else if (task.completed === 'no') {
    completedStatus = 'Not Completed';
  }

  // Prevent rendering of Tooltip during SSR (Server Side Rendering)
  if (!isMounted) {
    return null; // Or return a loading state if preferred
  }

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Star
              onClick={handleSubmit}
              width={20}
              height={20}
              color="white"
              className={`${
                task.completed === 'yes' ? 'bg-yellow-500' : 'bg-slate-400'
              } p-[3px] hover:bg-yellow-500 active:bg-yellow-500 rounded-xl cursor-pointer`}
            />
          </TooltipTrigger>
          <TooltipContent side="bottom" className="mt-2">
            <span className="p-1 font-bold text-[12px] rounded-2xl bg-slate-100">
              {completedStatus}
            </span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default CompletedTooltip;
