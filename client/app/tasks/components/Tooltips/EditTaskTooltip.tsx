import React from 'react'
import Modal from '../Modal'
import { useTasksContext } from '@/context/taskContext';
import { Task } from '@/utils/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import { FilePenLine } from 'lucide-react';

interface TaskProps{
    task: Task

}

function EditTaskTooltip({task}: TaskProps) {

const { deleteTask, getTask, updateTask, closeModal } = useTasksContext();

  return (
    <div>
              <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
          <FilePenLine
          width={20}
          height={20}
          color="white"
          className="bg-green-500 hover:bg-green-600 p-[3px] rounded-xl cursor-pointer"
        />
          </TooltipTrigger>
          <TooltipContent side="bottom" className="mt-2">
            <span className="p-1 font-bold text-[12px] rounded-2xl bg-slate-100">
              Edit Task
            </span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default EditTaskTooltip