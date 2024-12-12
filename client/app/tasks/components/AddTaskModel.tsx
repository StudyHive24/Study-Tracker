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
import { useState } from "react";
import DurationPicker from "../components/DurationPicker";
import { MoveRight, Tag, Tags } from "lucide-react";
import {TagsInput} from 'react-tag-input-component'


function AddTaskModel() {
  const [selectedValue, setSelectedValue] = useState("low");

  const handleRadioChange = (value: any) => {
    setSelectedValue(value);
    
  };

  const [selected, setSelected] = useState(['Coding'])

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-green-500 hover:bg-green-600 rounded-3xl mt-1">
            Add A New Task
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[525px] h-[100vh] p-7 ">
          <DialogHeader className="mt-5 gap-2">
            <DialogTitle>Create Task</DialogTitle>
          </DialogHeader>
          <div className=" p-3 gap-2 flex flex-col">
            <div className="flex mb-4 gap-5">
              <div className="">
                <Label htmlFor="title">Task title</Label>
                <Input
                  id="title"
                  placeholder="Enter a task title"
                  className="w-50 border-none bg-gray-200"
                ></Input>
              </div>
              <div>
                <Label htmlFor="description">Task description</Label>
                <Input
                  id="description"
                  placeholder="Enter a task description"
                  className="border-none bg-gray-200 w-50"
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
                ></Input>
              </div>
              <div>
                <Label htmlFor="time">Start time</Label>
                <Input id="time" type="time" className="border-none bg-gray-200" />
              </div>
              <div>
                <MoveRight />
              </div>
              <div>
                <Label htmlFor="duration">End time</Label>
                <Input id="time" type="time" className="border-none bg-gray-200" />
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              This task will due on the December 15, 2023 at 5.45 PM
            </div>
            <div className="mt-2 flex flex-col gap-2">
              <Label htmlFor="priority" >Priority</Label>
              <div className="flex gap-6">
                <div className={`flex gap-6 hover:bg-green-400 p-2 rounded-xl ${selectedValue === 'low' ? 'bg-green-400 text-white' : ""}`}>
                  <Label htmlFor="low">Low</Label>
                  <Input
                    id="low"
                    type="radio"
                    value="low"
                    checked={selectedValue === "low"}
                    onChange={() => handleRadioChange("low")}
                    className={`w-5 h-5 outline-none accent-white  ${selectedValue === 'low' ? 'accent-green-300' : ""}`}
                  ></Input>
                </div>
                <div className={`flex gap-6 hover:bg-orange-500 p-2 rounded-xl ${selectedValue === 'medium' ? 'bg-orange-500 text-white' : ""}`}>
                  <Label htmlFor="medium">Medium</Label>
                  <Input
                    id="medium"
                    type="radio"
                    value="medium"
                    checked={selectedValue === "medium"}
                    onChange={() => handleRadioChange("medium")}
                    className={`w-5 h-5 outline-none accent-white  ${selectedValue === 'medium' ? 'accent-orange-300' : ""}`}
                  ></Input>
                </div>
                <div className={`flex gap-6 hover:bg-red-500 p-2 rounded-xl ${selectedValue === 'high' ? 'bg-red-500 text-white' : ""}`}>
                  <Label htmlFor="high">high</Label>
                  <Input
                    id="high"
                    type="radio"
                    value="high"
                    checked={selectedValue === "high"}
                    onChange={() => handleRadioChange("high")}
                    className={`w-5 h-5 outline-none accent-white  ${selectedValue === 'high' ? 'accent-red-400' : ""}`}
                  ></Input>
                </div>
              </div>
              <div className="mt-1 gap-1 flex flex-col">
                <Label htmlFor="tags" className="">Tags</Label>
                <TagsInput 
                  value={selected}
                  onChange={setSelected}
                  name="tags"
                  placeHolder="Enter tags"
                  classNames={{
                    tag: 'tag',
                    input: 'input'
                  }}
                />
                
              </div>
              <div className="mt-1 gap-1 flex flex-col mb-2">
                <Label htmlFor="tags" className="">Attachments</Label>
                <Input type="file" className="bg-gray-200"></Input>
              </div>

              <div className="flex mt-1">
                <Input type="submit" className="bg-green-500 hover:bg-green-600 text-white rounded-xl" value={'Create Task'}></Input>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddTaskModel;
