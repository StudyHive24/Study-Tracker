"use client";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { useTasksContext } from "@/context/taskContext";
import { Task } from "@/utils/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";

interface TaskProps {
  task: Task;
}

function DeleteTaskModal({ task }: TaskProps) {
  const { deleteTask } = useTasksContext();
  const [isMounted, setIsMounted] = useState(false);

  // set state to true after the component mounts on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // render nothing or a loading state during SSR
    return null;
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Trash2
            width={20}
            height={20}
            color="white"
            className="bg-red-500 p-[3px] hover:bg-red-600 rounded-xl cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 border-none">
          <DialogHeader>
            <DialogTitle className="text-white">
              Are you absolutely sure?
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              This Action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                // delete the task
                deleteTask(task._id);
              }}
            >
              Delete Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DeleteTaskModal;
