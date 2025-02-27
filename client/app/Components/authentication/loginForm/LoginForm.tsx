'use client'
import { useUserContext } from '@/context/userContext'
import Link from 'next/link'
import React from 'react'

function LoginForm() {
  const { loginUser, userState, handlerUserInput } = useUserContext();
  const { email, password } = userState;

  const submitHandle = (e: { preventDefault: () => void; }) => {
      e.preventDefault();  // Prevent default form submission
      loginUser(e);  // Pass the event to the loginUser function
  };

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
                          <label>Email</label>
                          <hr />
                          <input
                              type="email"
                              className="p-1 w-[30vw] outline-none focus:border-2 border-blue-300 rounded-md"
                              placeholder="Enter email"
                              value={email}
                              onChange={(e) => handlerUserInput("email")(e)}
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
                                  Forgot Password?
                              </span>
                          </Link>
                      </div>
                      <button
                          disabled={!email || !password}
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

export default LoginForm