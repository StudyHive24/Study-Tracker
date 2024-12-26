'use client'
import { useUserContext } from '@/context/userContext'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function ResetPasswordForm() {
    const { passwordReset } = useUserContext()
    
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const emailChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const newPasswordChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value)
    }

    const confirmPasswordChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    }


    const submitHandle = (e: any) => {
        e.preventDefault()

        if (newPassword != confirmPassword) {
            toast.error('Passwords don\'t match')
        } else {
            passwordReset(email, newPassword)

            // clear the input email
            setEmail('')
            setNewPassword('')
            setConfirmPassword('')
        }

    }


  return (
    <div className="flex justify-center p-3 ">
      <form className="">
        <div className="flex flex-col gap-4 bg-white p-12 rounded-lg h-[65vh] mt-3">
          <div className="flex justify-center">
            <span className="text-xl">Change your StudyHive Password</span>
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
              <label>New Password</label>
              <hr />
              <input
                type="password"
                className="p-1 w-[30vw] outline-none focus:border-2 border-blue-300 rounded-md"
                placeholder="Enter new password"
                value={newPassword}
                onChange={newPasswordChangeHandle}
              ></input>
              <hr />
            </div>
            <div className="flex flex-col gap-1">
              <label>Confirm Password</label>
              <hr />
              <input
                type="password"
                className="p-1 w-[30vw] outline-none focus:border-2 border-blue-300 rounded-md"
                placeholder="Enter new password"
                value={confirmPassword}
                onChange={confirmPasswordChangeHandle}
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

export default ResetPasswordForm