'use client'
import { useUserContext } from '@/context/userContext'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

function LoginForm() {
  const { loginUser, userState, handlerUserInput } = useUserContext();
  const { name, password } = userState;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure the component is only rendered on the client side
  }, []);

  const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  // Prevent default form submission
    loginUser(e);  // Pass the event to the loginUser function
  };

  if (!isClient) {
    return null; // Prevents hydration errors by not rendering the component on the server side
  }

  return (
    <div className="flex justify-center p-3 ">
      <form onSubmit={submitHandle}>
        <div className="flex flex-col gap-4 bg-white p-12 rounded-lg mt-3">
          <div className="flex justify-center">
            <span className="text-xl">Login to your StudyHive Account</span>
          </div>
          <span className="text-sm text-gray-400 text-center mb-5">
            Login now, Don't have an account? 
            <Link href={"/register"} className="text-green-500">
              Register Here
            </Link>
          </span>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label>Username</label>
              <hr />
              <input
                type="text"
                className="p-1 w-[30vw] outline-none focus:border-2 border-blue-300 rounded-md"
                placeholder="Enter username"
                value={name}
                onChange={(e) => handlerUserInput("name")(e)}
              />
              <hr />
            </div>
            <div className="flex flex-col gap-1">
              <label>Password</label>
              <hr />
              <input
                type="password"
                className="p-1 w-[30vw] outline-none focus:border-2 border-blue-300 rounded-md"
                placeholder="Enter a password"
                value={password}
                onChange={(e) => handlerUserInput("password")(e)}
              />
              <hr />
            </div>
            <div className='flex justify-end'>
              <Link href={'/forgot-password'}>
                <span className='text-blue-500 text-[15px] hover:text-blue-600 cursor-pointer'>
                  Forgot Password or Username?
                </span>
              </Link>
            </div>
            <button
              disabled={!name || !password}
              type="submit"
              className="bg-blue-300 p-2 rounded-lg mt-3 hover:bg-blue-400 cursor-pointer"
            >
              Login Now
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
