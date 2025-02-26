"use client";
import React from "react";
import { useUserContext } from "@/context/userContext";
import Link from "next/link";

function RegisterForm() {
  const { registerUser, handlerUserInput, userState } = useUserContext();
  const { name = "", email = "", password = "" } = userState || {};

  return (
    <div className="flex justify-center p-3">
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          registerUser();
        }}
      >
        <div className="flex flex-col gap-4 bg-white p-12 rounded-lg mt-3">
          <div className="flex justify-center">
            <span className="text-xl">Register to StudyHive</span>
          </div>
          <span className="text-sm text-gray-400 text-center mb-5">
            Create an Account, Already have an account?
            <Link href="/login" className="text-green-500">
              {"  "} Login here
            </Link>
          </span>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-gray-600">Name</label>
              <input
                type="text"
                className="p-1 w-[30vw] outline-none focus:border-2 border-blue-300 rounded-md"
                placeholder="Enter name"
                value={name}
                onChange={(e) => handlerUserInput("name")(e)}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Email</label>
              <input
                type="email"
                className="p-1 w-[30vw] outline-none focus:border-2 border-blue-300 rounded-md"
                placeholder="Enter email"
                value={email}
                onChange={(e) => handlerUserInput("email")(e)}
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label>Password</label>
              <input
                type="password"
                className="p-1 w-[30vw] outline-none focus:border-2 border-blue-300 rounded-md"
                placeholder="Enter a password"
                value={password}
                onChange={(e) => handlerUserInput("password")(e)}
                required
              />
            </div>

            <button
              disabled={!name || !email || !password}
              type="submit"
              className="bg-blue-300 p-2 rounded-lg mt-3 hover:bg-blue-400"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
