import React, { FormEvent, useEffect, useState } from "react";
import { FilePenLine, Star, Trash2 } from "lucide-react";
import { edit, star, trash } from "@/utils/Icons";
import { Task } from "@/utils/types";
import { formatTime } from "@/utils/utilities";
import { useTasksContext } from "@/context/taskContext.js";
import Modal from "./Modal";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import TrashTooltip from "./Tooltips/TrashTooltip";
import CompletedTooltip from "./Tooltips/CompletedTooltip";
import EditTaskTooltip from "./Tooltips/EditTaskTooltip";
import DeleteTaskModal from "./Modals/DeleteTaskModal";

interface TaskProps {
  task: Task;
}

function TaskItem({ task }: TaskProps) {
  const { deleteTask, getTask, updateTask, closeModal } = useTasksContext();
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // This ensures that the code only runs on the client-side
  }, []);

  let completed = task.completed;

  const handleSubmit = () => {
    if (task.completed == 'no') {
      updateTask({...task, completed: 'yes'});
    } else if (task.completed == 'yes') {
      updateTask({...task, completed: 'no'});
    }
  };

  const priorityColor = (priority: string) => {
    if (priority == "Low") {
      return "text-green-500";
    } else if (priority == "Medium") {
      return "text-yellow-500";
    } else if (priority == "High") {
      return "text-red-500";
    } else {
      return "text-green-500";
    }
  };

  return (
    <div className="flex flex-col justify-between bg-gray-700 p-4 rounded-lg h-60 m-[5px] ">
      <div className="flex flex-col">
        <span className="mb-1 mt-1 text-gray-300 bg-gray-600 p-2 rounded-lg">
          {task.title}
        </span>
        <textarea
          name=""
          disabled
          id=""
          className="text-sm p-2 text-gray-200 bg-gray-500 rounded-lg mt-1 overflow-y-scroll resize-none"
          value={task.description}
          rows={4}
          
        ></textarea>
      </div>
      <div className="flex flex-row gap-3 text-sm justify-between">
        <span className="text-slate-400 ">{formatTime(task.createdAt)}</span>
        <span className={`${priorityColor(task.priority)}`}>
          {task.priority}
        </span>
        <div className="flex flex-row gap-1">
          {/* Only render tooltips and modals on the client-side */}
          {isClient && (
            <>
              <CompletedTooltip task={task} />
              <Modal task={task} />
              <DeleteTaskModal task={task} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
