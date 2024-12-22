"use client";
import { useTasksContext } from "@/context/taskContext";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import React from "react";
import image from '../../../public/favicon.jpg'

function Profile() {
  const { user } = useUserContext();
  const { tasks, activeTasks, completedTasks, openProfileModal, pendingTasks } = useTasksContext();
  return (
    <div className="m-3">
      <div
        className="px-2 py-4 flex items-center gap-3 bg-[#E6E6E6]/20 rounded-[0.8rem] text-white
        hover:bg-[#E6E6E6]/50 transition duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-white"
        onClick={openProfileModal}
      >
        <div>
          <Image
            src={image}
            alt="avatar"
            width={70}
            height={70}
            className="rounded-full"
          />
        </div>
        <div>
          <h1 className="flex flex-col text-xl">
            <span className=" font-medium">Hello,</span>
            <span className="font-bold">{user?.name}</span>
          </h1>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-8 bg-gray-700 rounded-xl p-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-gray-300">
            <p className="text-sm">Total Tasks:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-purple-500 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-gray-200">
                {tasks?.length}
              </span>
            </p>
          </div>
          <div className="text-gray-300">
            <p className="text-sm">In Progress:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-[#3AAFAE] rounded-[5px]"></span>
              <span className="font-medium text-4xl text-gray-200">
                {pendingTasks?.length}
              </span>
            </p>
          </div>
          <div className="text-gray-300">
            <p className="text-sm">Open Tasks:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-orange-400 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-gray-200">
                {activeTasks?.length}
              </span>
            </p>
          </div>
          <div className="text-gray-300">
            <p className="text-sm">Completed:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-green-400 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-gray-200">
                {completedTasks?.length}
              </span>
            </p>
          </div>
        </div>
      </div>
      <h3 className="mt-8 font-medium text-gray-100">{user.name}'s Activity</h3>
    </div>
  );
}

export default Profile;