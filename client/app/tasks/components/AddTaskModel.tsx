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
import { useTasksContext } from "@/context/taskContext.js";
import toast from "react-hot-toast";

function AddTaskModel() {
  const [selectedValue, setSelectedValue] = useState("low");
  const [currentTime, setCurrentTime] = useState("");

  const {
    task,
    handleInput,
    createTask,

  } = useTasksContext();

  const ref = useRef(null);

  useEffect(() => {
    const time = new Date().toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setCurrentTime(time);
  }, []);

  // const handleRadioChange = (value: any) => {
  //   setSelectedValue(value);
  // };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ensure task is correctly set
    const endDate = new Date(`${task?.duedate}T${task?.endTime}:00`);

    const updatedTask = { ...task, endTime: endDate };

    createTask(updatedTask);
  };

  // const [tags, setTags] = useState(["Coding"]);

  return (
    <Dialog>
      <DialogTrigger>
        <span className="bg-green-500 hover:bg-green-600 rounded-3xl mt-1 p-4 text-gray-50">
          Add A New Task
        </span>
      </DialogTrigger>
      <DialogContent className="w-[525px]  p-7 bg-gray-800 border-none">
        <DialogHeader className="mt-5 gap-2">
          <DialogTitle className="text-gray-100">
            Create Task
            <hr className="mt-3" />
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="p-3 gap-2 flex flex-col">
            <div className="gap-2 flex flex-col mb-1">
              <Label htmlFor="title" className="text-gray-200">
                Task title
              </Label>
              <input
                id="title"
                placeholder="Enter a task title"
                className=" border-none bg-gray-200 p-2 rounded-md"
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
                  className="border-none bg-gray-200  p-2 rounded-md"
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
                  min={new Date().toISOString().split("T")[0]} // Disable past dates
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

export default AddTaskModel;
