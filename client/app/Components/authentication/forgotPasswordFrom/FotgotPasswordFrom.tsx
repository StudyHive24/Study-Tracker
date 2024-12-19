'use client'
import { useUserContext } from '@/context/userContext'
import Link from 'next/link'
import React, { useState } from 'react'

function ForgotPasswordForm() {

    const { forgotPasswordEmail} = useUserContext()
    
    const [email, setEmail] = useState('')

    const emailChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const submitHandle = (e: any) => {
        e.preventDefault()
        forgotPasswordEmail(email)

        // clear the input email
        setEmail('')
    }


  return (
    <div className="flex justify-center p-3 ">
      <form className="">
        <div className="flex flex-col gap-4 bg-white p-12 rounded-lg h-[65vh] mt-3">
          <div className="flex justify-center">
            <span className="text-xl">Login to your StudyHive Account</span>
          </div>
          <span className="text-sm text-gray-400 text-center mb-5">
            Login now, Don't have an account? 
            <Link href={"/register"} className="text-green-500">
              {"  "}
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
                onChange={emailChangeHandle}
              ></input>
              <hr />
            </div>
            
            <button
              disabled={ !email }
              type="submit"
              onClick={submitHandle}
              className="bg-blue-300 p-2 rounded-lg mt-3 hover:bg-blue-400 cursor-pointer"
            >
              Login Now
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ForgotPasswordForm