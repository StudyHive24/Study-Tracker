"use client";
import { useTasksContext } from "@/context/taskContext.js";
import { useUserContext } from "../../../context/userContext";
import useDetectOutside from "@/hooks/usedetectOutside";
import { badge, check, github, mail } from "@/utils/Icons";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { BadgeCheck, Check, Github, Target } from "lucide-react";
import image from '@/public/favicon.jpg'
import Link from "next/link";

const ProfileSettings = () => {
  const ref = useRef(null);

  const { closeModal } = useTasksContext();
  const { user, updateUser, handlerUserInput, userState, changePassword, removeUserInput, setUserState } = useUserContext();

  useDetectOutside({
    ref,
    callback: () => {
      closeModal();
    },
  });

  const { name, email, photo } = user;

  // state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePassword = (type: string) => (e: any) => {
    if (type === "old") {
      setOldPassword(e.target.value);
    } else {
      setNewPassword(e.target.value);
    }
  };



  return (
    <div className="">
      <div
        className="py-5 px-6 max-w-[] w-full flex flex-col gap-3 bg-gray-900 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md"
      >
        <div className="absolute left-0 top-0 w-full h-[80px] bg-[#323232]/10 rounded-tr-md rounded-tl-md "></div>

        <div className="mt-4 relative flex justify-between bg-gray-700 rounded-xl p-2 ">
          <div className="relative inline-block p-2">
            <Image
              src={image}
              alt="profile"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="absolute bottom-0 right-1 shadow-sm">
              <span className="text-lg text-gray-400">{badge}</span>
              <span className="absolute z-20 left-[50%] top-[50%] translate-x-[-100%] translate-y-[-110%] text-xs text-white">
                <BadgeCheck color="lightBlue"/>
              </span>
            </div>
          </div>
          <div className="self-end flex items-center gap-2">
            <Link href={'https://github.com/StudyHive24/Study-Tracker/'} target="_blank">
            <button className="flex items-center gap-2  rounded-md py-1 px-3 text-xs font-medium text-gray-300">
            <Github/> Github
            </button>
            </Link>
            <button className="flex items-center gap-2 border-2 border-[#323232]/10 rounded-md py-1 px-3 text-xs font-medium text-gray-300">
              <BadgeCheck/> Verified
            </button>
          </div>
        </div>
        <div className="bg-gray-700 p-3 rounded-lg">
          <h1 className="text-lg font-bold text-gray-200">{name}</h1>
          <p className="text-sm text-gray-400">{email}</p>
        </div>

        <form
          action=""
          className="mt-1 pt-2 flex flex-col gap-4  border-t-[#323232]/10 bg-gray-700 p-12 rounded-lg"
          onSubmit={(e) => {
            e.preventDefault();
            updateUser(e, {
              name: userState.name,
              email: userState.email,
            });
          }}
        >
          <div className="pt-2 flex flex-col gap-2">
            <label htmlFor="name" className="text-base text-gray-200 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={user.name}
              onChange={(e) => handlerUserInput("name")(e)} // Correct usage
              className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
            />
          </div>

          <div className=" flex flex-col  gap-2">
            <label htmlFor="email" className="text-base text-gray-200 font-medium">
              Email Address
            </label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => handlerUserInput("email")(e)} // Correct usage
                className="w-full py-[0.4rem] px-3 font-medium rounded-lg border-none text-gray-600"
              />
              <span className="absolute left-0 top-0 bottom-0 flex items-center px-3 ">
                {mail}
              </span>
          </div>

          <div className="pt-4 grid grid-cols-2 gap-4 border-t-2 ">
            <div className="flex flex-col gap-2">
              <label htmlFor="oldPassWord" className="text-base text-gray-200 font-medium">
                Old Password
              </label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={handlePassword("old")}
                className="py-[0.4rem] px-3 font-base rounded-lg border-2 border-[#323232]/10"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="newPassword" className="text-base text-gray-200 font-medium">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={handlePassword("new")}
                className="py-[0.4rem] px-3 font-medium rounded-lg border-2 border-[#323232]/10"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="py-3 px-4 bg-blue-500 text-white text-sm font-medium rounded-md
                hover:bg-blue-600 transition-all duration-300"
              onClick={() => changePassword(oldPassword, newPassword)}
            >
              Change Password
            </button>
          </div>

          <div className="flex justify-end gap-4 border-t-2 border-t-[#323232]/10">
            <button
              type="submit"
              className="mt-3 py-2 px-4 bg-[#3aafae] w-full text-white text-sm font-medium rounded-md
                hover:bg-[#2e8d8c]/90 transition-all duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
