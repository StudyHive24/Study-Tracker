'use client'
import { useUserContext } from '@/context/userContext'
import Link from 'next/link'
import React, { useState } from 'react'

function PasswordVerifyCodeForm() {
    const { verifyResetCode } = useUserContext()
    
    const [email, setEmail] = useState('')
    const [resetCode, setResetCode] = useState('')

    const emailChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const verificationCodeChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setResetCode(e.target.value)
    }

    const submitHandle = (e: any) => {
        e.preventDefault()
        verifyResetCode(email, resetCode)

        // clear the input email
        setEmail('')
        setResetCode('')
    }


  return (
    <div className="flex justify-center p-3 ">
      <form className="">
        <div className="flex flex-col gap-4 bg-white p-12 rounded-lg mt-3">
          <div className="flex justify-center">
            <span className="text-xl">Enter email and verification code to reset your password</span>
          </div>
          <span className="text-sm text-gray-400 text-center mb-5">
            Don't have an account? 
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
            <div className="flex flex-col gap-1">
              <label>Verification Code</label>
              <hr />
              <input
                type="password"
                className="p-1 w-[30vw] outline-none focus:border-2 border-blue-300 rounded-md"
                placeholder="Enter verification code"
                value={resetCode}
                onChange={verificationCodeChangeHandle}
              ></input>
              <hr />
            </div>
            
            <button
              disabled={ !email }
              type="submit"
              onClick={submitHandle}
              className="bg-blue-300 p-2 rounded-lg mt-3 hover:bg-blue-400 cursor-pointer"
            >
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PasswordVerifyCodeForm