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
  const { updateTask, openModalForEdit } = useTasksContext();

  const [localTask, setLocalTask] = useState(task);

  useEffect(() => {
    setLocalTask(task);
  }, [task]);

  const handleInput2 = (fieldName: any) => (e: any) => {
    setLocalTask((prevTask) => ({ ...prevTask, [fieldName]: e.target.value }));
  };

  // to get due date to normal date
  const duedate = localTask?.duedate;
  const date = new Date(duedate);
  const updatedDueDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });


  const endDate = new Date(`${localTask.duedate}T${localTask.endTime}:00`);

  // Extract hours and minutes
  const hours = endDate.getHours().toString().padStart(2, '0'); // Ensures 2-digit format
  const minutes = endDate.getMinutes().toString().padStart(2, '0'); // Ensures 2-digit format
  
  // Combine into endTime string
  const endTime2 = `${hours}:${minutes}`;
  

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const endDate = new Date(`${localTask.duedate}T${localTask.endTime}:00`);
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
      <DialogContent className="w-[525px] h-[90vh] p-7 bg-gray-800 border-none">
        <DialogHeader className="mt-5 gap-2">
          <DialogTitle className="text-gray-100">
            {localTask ? "Edit Task" : "Create Task"}
            <hr className="mt-3"/>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="p-3 gap-2 flex flex-col">
            <div className="flex mb-4 gap-5">
              <div className="gap-2 flex flex-col w-50">
                <Label htmlFor="title" className="text-gray-200">
                  Task title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter a task title"
                  className="w-[30vw] border-none bg-gray-200"
                  onChange={(e) => handleInput2("title")(e)}
                  value={localTask?.title || ""}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="gap-2 flex flex-col">
                <Label htmlFor="description" className="text-gray-200">
                  Task description
                </Label>
                <textarea
                  id="description"
                  placeholder="Enter a task description"
                  className="border-none bg-gray-200  p-2 rounded-md"
                  onChange={(e) => handleInput2("description")(e)}
                  value={localTask?.description || ""}
                  cols={50}
                  rows={4}
                ></textarea>
              </div>
            </div>
            <div className="mt-2 flex justify-between">
              <div className="flex flex-col gap-2">
                <Label htmlFor="duedate" className="text-gray-200">
                  Date
                </Label>
                <Input
                  id="duedate"
                  type="date"
                  className="border-none bg-gray-200"
                  onChange={(e) => handleInput2("duedate")(e)}
                  value={localTask?.duedate || ""}
                />
              </div>
              <div className="flex flex-col gap-2 ">
                <Label htmlFor="duration" className="text-gray-200">
                  End time
                </Label>
                <Input
                  id="time"
                  type="time"
                  className="border-none bg-gray-200"
                  onChange={(e) => handleInput2("endTime")(e)}
                  value={localTask?.endTime || ""}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="priority" className="text-gray-200">
                  Priority
                </Label>
                <select
                  className="p-2 rounded-md border cursor-pointer bg-gray-200"
                  onChange={(e) => handleInput2("priority")(e)}
                  value={localTask?.priority || "Low"}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <div className="text-gray-400 mt-1 text-[14px]">
              This task will due on the{" "}
              <span className="text-green-700 border-b-2 border-gray-200">
                {updatedDueDate || "a specified date"}
              </span>{" "}
              at <span className="text-green-700 border-b-2 border-gray-200">{localTask.endTime || "a specific time"}</span>
            </div>
            <div className="flex flex-col gap-2 mt-1">
              <Label htmlFor="completed" className="text-gray-200">Task Completed</Label>
              <select
                className="bg-gray-200 p-2 rounded-md border cursor-pointer"
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

export default Modal;
