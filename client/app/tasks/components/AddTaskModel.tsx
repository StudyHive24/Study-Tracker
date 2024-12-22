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
import {} from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { FormEvent, useEffect, useRef, useState } from "react";
import { MoveRight, Tag, Tags } from "lucide-react";
import {TagsInput} from 'react-tag-input-component'
import { useTasksContext } from "@/context/taskContext.js";
import { time } from "console";


function AddTaskModel() {
  const [selectedValue, setSelectedValue] = useState("low")
  
  const currentTime = new Date().toLocaleString([], {hour: '2-digit', minute: '2-digit'})

  const {
    task,
    handleInput,
    createTask,
    isEditing,
    closeModal,
    modalMode,
    activeTask,
    updateTask,
    getTask
  } = useTasksContext()

  const ref = useRef(null)

  const handleRadioChange = (value: any) => {
    setSelectedValue(value)
    
  };



  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // if (modalMode === 'edit') {
    //   updateTask(task)
    // } else if (modalMode === 'add') {
    //   createTask(task)
    // }
    const endDate = new Date(`${task.duedate}T${task.endTime}:00`);

    const updatedTask = {...task, endTime: endDate}


    createTask(updatedTask)

     closeModal()
  }

  const [tags, setTags] = useState(['Coding'])

  return (
    <>
      <Dialog>
        <DialogTrigger >
          <Button className="bg-green-500 hover:bg-green-600 rounded-3xl mt-1" >
            Add A New Task
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[525px] h-[90vh] p-7 bg-gray-800 border-none">
        <DialogHeader className="mt-5 gap-2">
          <DialogTitle className="text-gray-100">
            Create Task
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
                  onChange={(e) => handleInput("title")(e)}
                  value={task?.title || ""}
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
            <div className="text-gray-400 mt-1 text-[14px]">
              This task will due on the{" "}
              <span className="text-green-700 border-b-2 border-gray-200">
                {task.duedate || "a specified date"}
              </span>{" "}
              at <span className="text-green-700 border-b-2 border-gray-200">{task.endTime || "a specific time"}</span>
            </div>
            <div className="flex flex-col gap-2 mt-1">
              <Label htmlFor="completed" className="text-gray-200">Task Completed</Label>
              <select
                className="bg-gray-200 p-2 rounded-md border cursor-pointer"
                onChange={(e) => handleInput("completed")(e)}
                value={task?.completed ? "true" : "false"}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="mt-6 bg-green-600 w-[20vw] hover:bg-green-700 text-white rounded-xl"
              >
                Create Task
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
      </Dialog>
    </>
  );
}

export default AddTaskModel;