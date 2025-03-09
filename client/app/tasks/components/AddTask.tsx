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
import { MoveRight, Tag, Tags } from "lucide-react";
import { TagsInput } from "react-tag-input-component";
import { useTasksContext } from "@/context/taskContext.js";
import toast from "react-hot-toast";

function AddTask() {
  const [selectedValue, setSelectedValue] = useState("low");
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  const {
    task,
    handleInput,
    createTask,
  } = useTasksContext();

  // const ref = useRef(null);

  useEffect(() => {
    // Set the current time only on the client side to avoid hydration issues
    const time = new Date().toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setCurrentTime(time);
  }, []);

  const handleRadioChange = (value: any) => {
    setSelectedValue(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const endDate = new Date(`${task.duedate}T${task.endTime}:00`);
    const updatedTask = { ...task, endTime: endDate };

    // check if there is a title or not
    if (!task?.title) {
      toast.error("Enter a title");
      return;
    }

    // create the task
    createTask(updatedTask);
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="">
        <div className="flex flex-col justify-center text-center border-2 border-dashed border-gray-600 bg-none  transition duration-200 ease-in-out hover:bg-gray-700 hover:border-white p-2 rounded-lg h-60 m-[5px] mt-2 cursor-pointer">
          <span className="bg-none text-gray-200">Add A New Task</span>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[525px] p-7 bg-gray-800 border-none">
        <DialogHeader className="mt-5 gap-2">
          <DialogTitle className="text-gray-100">
            Create Task
            <hr className="mt-3" />
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="p-3 gap-2 flex flex-col w-full">
            <div className="gap-2 flex flex-col">
              <Label htmlFor="title" className="text-gray-200">
                Task title
              </Label>
              <Input
                id="title"
                placeholder="Enter a task title"
                className="gap-2 flex flex-col mb-1 bg-gray-200"
                onChange={(e) => handleInput("title")(e)}
                value={task?.title || ""}
              />
            </div>
            <div className="flex justify-between">
              <div className="gap-2 flex flex-col">
                <Label htmlFor="description" className="text-gray-200">
                  Task description
                </Label>
                <textarea
                  id="description"
                  placeholder="Enter a task description"
                  className="border-none bg-gray-200 p-2 rounded-md"
                  onChange={(e) => handleInput("description")(e)}
                  value={task?.description || ""}
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
                  onChange={(e) => handleInput("duedate")(e)}
                  value={task?.duedate || ""}
                  min={new Date().toISOString().split("T")[0]} // disable past dates
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="time" className="text-gray-200">
                  End time
                </Label>
                <Input
                  id="time"
                  type="time"
                  className="border-none bg-gray-200"
                  onChange={(e) => handleInput("endTime")(e)}
                  value={task?.endTime || ""}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="priority" className="text-gray-200">
                  Priority
                </Label>
                <select
                  className="p-2 rounded-md border cursor-pointer bg-gray-200"
                  onChange={(e) => handleInput("priority")(e)}
                  value={task?.priority || "Low"}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className="mt-6 bg-green-600 w-full hover:bg-green-700 text-white rounded-xl"
              >
                Create Task
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddTask;
