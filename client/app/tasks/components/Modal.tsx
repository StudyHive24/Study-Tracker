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
import { FormEvent, useEffect, useState } from "react";
import { FilePenLine } from "lucide-react";
import { useTasksContext } from "@/context/taskContext";
import { Task } from "@/utils/types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface TaskPropsModal {
  task: Task;
}

function Modal({ task }: TaskPropsModal) {
  const { updateTask } = useTasksContext();
  const [localTask, setLocalTask] = useState<Task>({ ...task });

  useEffect(() => {
    setLocalTask({
      ...task,
      duedate: task.duedate
        ? new Date(task.duedate).toISOString().split("T")[0]
        : "",
      endTime: task.endTime
        ? new Date(task.endTime).toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "",
    });
  }, [task]);

  const handleInputChange =
    (fieldName: keyof Task) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setLocalTask((prevTask) => ({
        ...prevTask,
        [fieldName]: e.target.value,
      }));
    };

  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedEndTime = new Date(
      `${localTask.duedate}T${localTask.endTime}:00`
    );

    const updatedTask = { ...localTask, endTime: updatedEndTime };

    updateTask(updatedTask);
    toast.success("Task updated successfully!");
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
      <DialogContent className="w-[525px]  p-7 bg-gray-800 border-none">
        <DialogHeader className="mt-5 gap-2">
          <DialogTitle className="text-gray-100">
            {localTask ? "Edit Task" : "Create Task"}
            <hr className="mt-3" />
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="p-3 gap-2 flex flex-col">
            {/* Task Title */}
            <div className="gap-2 flex flex-col w-50">
              <Label htmlFor="title" className="text-gray-200">
                Task title
              </Label>
              <Input
                id="title"
                placeholder="Enter a task title"
                className="gap-2 flex flex-col mb-1"
                onChange={handleInputChange("title")}
                value={localTask.title || ""}
              />
            </div>

            {/* Task Description */}
            <div className="flex justify-between">
              <div className="gap-2 flex flex-col">
                <Label htmlFor="description" className="text-gray-200">
                  Task description
                </Label>
                <textarea
                  id="description"
                  placeholder="Enter a task description"
                  className="border-none bg-gray-200 p-2 rounded-md"
                  onChange={handleInputChange("description")}
                  value={localTask.description || ""}
                  cols={50}
                  rows={4}
                ></textarea>
              </div>
            </div>

            {/* Due Date, End Time, and Priority */}
            <div className="mt-2 flex justify-between">
              <div className="flex flex-col gap-2">
                <Label htmlFor="duedate" className="text-gray-200">
                  Date
                </Label>
                <Input
                  id="duedate"
                  type="date"
                  className="border-none bg-gray-200"
                  onChange={handleInputChange("duedate")}
                  value={localTask.duedate || ""}
                  min={new Date().toISOString().split("T")[0]} // Disable past dates
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="endTime" className="text-gray-200">
                  End time
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  className="border-none bg-gray-200"
                  onChange={handleInputChange("endTime")}
                  value={localTask.endTime || ""}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="priority" className="text-gray-200">
                  Priority
                </Label>
                <select
                  className="p-2 rounded-md border cursor-pointer bg-gray-200"
                  onChange={handleInputChange("priority")}
                  value={localTask.priority || "Low"}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            {/* Task Completion Status */}
            <div className="flex flex-col gap-2 mt-1">
              <Label htmlFor="completed" className="text-gray-200">
                Task Completed
              </Label>
              <select
                className="bg-gray-200 p-2 rounded-md border cursor-pointer"
                onChange={handleInputChange("completed")}
                value={localTask.completed || "no"}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="mt-6 bg-blue-500 w-full hover:bg-blue-600 text-white rounded-xl"
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
