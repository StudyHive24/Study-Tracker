"use client";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { FormEvent, useEffect, useRef, useState } from "react";
import { FilePenLine } from "lucide-react";
import { useTasksContext } from "@/context/taskContext";
import { Task } from "@/utils/types";
import toast from "react-hot-toast";

interface TaskPropsModal {
  task: Task;
}

function Modal({ task }: TaskPropsModal) {
  const {
    updateTask,
    openModalForEdit,
  } = useTasksContext();

  const [localTask, setLocalTask] = useState(task);

  useEffect(() => {
    setLocalTask(task);
  }, [task]);



  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!localTask?.title || !localTask?.dueDate) {
      toast.error("Title and Due Date are required");
      return;
    }

    const endDate = new Date(`${localTask.dueDate}T${localTask.endTime}:00`);
    const updatedTask = { ...localTask, endTime: endDate };

    updateTask(updatedTask);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FilePenLine
          width={20}
          height={20}
          color="white"
          className="bg-green-500 hover:bg-green-600 p-[3px] rounded-xl cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent className="w-[525px] h-[75vh] p-7">
        <DialogHeader className="mt-5 gap-2">
          <DialogTitle>{localTask ? "Edit Task" : "Create Task"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="p-3 gap-2 flex flex-col">
            <div className="flex mb-4 gap-5">
              <div>
                <Label htmlFor="title">Task title</Label>
                <Input
                  id="title"
                  placeholder="Enter a task title"
                  className="w-50 border-none bg-gray-200"
                  onChange={(e) => handleInput2("title")(e)}
                  value={localTask?.title || ""}
                />
              </div>
              <div>
                <Label htmlFor="description">Task description</Label>
                <Input
                  id="description"
                  placeholder="Enter a task description"
                  className="border-none bg-gray-200 w-50"
                  onChange={(e) => handleInput2("description")(e)}
                  value={localTask?.description || ""}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <Label htmlFor="duedate">Date</Label>
                <Input
                  id="duedate"
                  type="date"
                  className="border-none bg-gray-200"
                  onChange={(e) => handleInput2("dueDate")(e)}
                  value={localTask?.dueDate || ""}
                />
              </div>
              <div>
                <Label htmlFor="duration">End time</Label>
                <Input
                  id="time"
                  type="time"
                  className="border-none bg-gray-200"
                  onChange={(e) => handleInput2("endTime")(e)}
                  value={localTask?.endTime || ""}
                />
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <Label htmlFor="priority">Priority</Label>
              <select
                className="p-2 rounded-md border cursor-pointer w-[30vw] bg-gray-200"
                onChange={(e) => handleInput2("priority")(e)}
                value={localTask?.priority || "Low"}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="completed">Task Completed</Label>
              <select
                className="bg-gray-200 p-1 rounded-md border cursor-pointer"
                onChange={(e) => handleInput2("completed")(e)}
                value={localTask?.completed ? "true" : "false"}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="mt-6 bg-blue-500 w-[20vw] hover:bg-blue-600 text-white rounded-xl"
              >
                Update Task
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
