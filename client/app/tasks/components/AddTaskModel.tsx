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
import { FormEvent, useRef, useState } from "react";
import { MoveRight, Tag, Tags } from "lucide-react";
import {TagsInput} from 'react-tag-input-component'
import { useTasksContext } from "@/context/taskContext";
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
    updateTask
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


    createTask(updateTask)

     closeModal()
  }

  const [tags, setTags] = useState(['Coding'])

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-green-500 hover:bg-green-600 rounded-3xl mt-1">
            Add A New Task
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[525px] h-[75vh] p-7 ">
          <DialogHeader className="mt-5 gap-2">
            <DialogTitle>Create Task</DialogTitle>
          </DialogHeader>
          <form action=""
            ref={ref} onSubmit={handleSubmit}
          >
          <div className=" p-3 gap-2 flex flex-col">
            <div className="flex mb-4 gap-5">
              <div className="">
                <Label htmlFor="title">Task title</Label>
                <Input
                  id="title"
                  placeholder="Enter a task title"
                  className="w-50 border-none bg-gray-200"
                  onChange={(e) => handleInput('title')(e)}
                  name="title"
                  value={task.title}
                ></Input>
              </div>
              <div>
                <Label htmlFor="description">Task description</Label>
                <Input
                  id="description"
                  placeholder="Enter a task description"
                  className="border-none bg-gray-200 w-50"
                  onChange={(e) => handleInput('description')(e)}
                  name="description"
                  value={task.description}
                ></Input>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="">
                <Label htmlFor="duedate">Date</Label>
                <Input
                  id="duedate"
                  type="date"
                  className="border-none bg-gray-200"
                  onChange={(e) => handleInput('duedate')(e)}
                  name="duedate"
                  value={task.duedate}
                ></Input>
              </div>
              <div>
                <Label htmlFor="duration">End time</Label>
                <Input id="time" type="time" value={task.endTime} className="border-none bg-gray-200" 
                  onChange={(e) => handleInput('endTime')(e)}
                />
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              This task will due on the {task.duedate || 'a specified date'} at {task.endTime || 'a specific time'}
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <Label htmlFor="priority" >Priority</Label>
              <div className="">
              <select
                className=" p-2 rounded-md border cursor-pointer border-none w-[30vw] bg-gray-200 focus:bg-green-200"
                name="priority"
                value={task.priority}
                onChange={(e) => handleInput("priority")(e)}
              >
                <option className="bg-green-300" value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              </div>

              <div className="flex flex-col gap-1">
          <label htmlFor="completed">Task Completed</label>
          <div className="flex items-center justify-between  bg-gray-200 p-2 rounded-md border">
            <label htmlFor="completed">Completed</label>
            <div>
              <select
                className=" bg-gray-200 p-1 rounded-md border cursor-pointer"
                name="completed"
                value={task.completed ? "true" : "false"}
                onChange={(e) => handleInput("completed")(e)}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
          </div>

              <div className="flex justify-center">
                <Button type="submit" className="mt-6 bg-green-500 w-[20vw] hover:bg-green-600 text-white rounded-xl " >Create Task</Button>
              </div>
            </div>
          </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddTaskModel;
