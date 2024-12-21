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

interface TaskPropsModal {
  task: Task
}


function Modal({task} : TaskPropsModal) {
  const {
    createTask,
    isEditing,
    modalMode,
    activeTask,
    updateTask,
    getTask,
    openModalForEdit,
    handleInput2
  } = useTasksContext();

  const ref = useRef<HTMLFormElement>(null);

  
  

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const endDate = new Date(`${task.dueDate}T${task.endTime}:00`);
    const updatedTask = { ...task, endTime: endDate };

    updateTask(updatedTask); // Pass the updated task object
  };

  return (
    <>
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
            <DialogTitle>Create Task</DialogTitle>
          </DialogHeader>
          <form ref={ref} onSubmit={handleSubmit}>
            <div className="p-3 gap-2 flex flex-col">
              {/* Task Title and Description */}
              <div className="flex mb-4 gap-5">
                <div>
                  <Label htmlFor="title">Task title</Label>
                  <Input
                    id="title"
                    placeholder="Enter a task title"
                    className="w-50 border-none bg-gray-200"
                    onChange={(e) => handleInput2("title")(e)}
                    name="title"
                    value={task?.title || ""}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Task description</Label>
                  <Input
                    id="description"
                    placeholder="Enter a task description"
                    className="border-none bg-gray-200 w-50"
                    onChange={(e) => handleInput2("description")(e)}
                    name="description"
                    value={task?.description || ""}
                  />
                </div>
              </div>
              {/* Due Date and Time */}
              <div className="flex justify-between">
                <div>
                  <Label htmlFor="duedate">Date</Label>
                  <Input
                    id="duedate"
                    type="date"
                    className="border-none bg-gray-200"
                    onChange={(e) => handleInput2("dueDate")(e)}
                    name="duedate"
                    value={task?.dueDate || ""}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">End time</Label>
                  <Input
                    id="time"
                    type="time"
                    className="border-none bg-gray-200"
                    onChange={(e) => handleInput2("endTime")(e)}
                    value={task?.endTime || ""}
                  />
                </div>
              </div>
              {/* Priority */}
              <div className="mt-2 flex flex-col gap-2">
                <Label htmlFor="priority">Priority</Label>
                <select
                  className="p-2 rounded-md border cursor-pointer border-none w-[30vw] bg-gray-200 focus:bg-green-200"
                  name="priority"
                  value={task?.priority || "Low"}
                  onChange={(e) => handleInput2("priority")(e)}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              {/* Completed */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="completed">Task Completed</Label>
                <select
                  className="bg-gray-200 p-1 rounded-md border cursor-pointer"
                  name="completed"
                  value={task?.completed ? "true" : "false"}
                  onChange={(e) => handleInput2("completed")(e)}
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              {/* Submit Button */}
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
    </>
  );
}

export default Modal;
