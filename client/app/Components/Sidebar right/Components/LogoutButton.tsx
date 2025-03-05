"use client"

import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Dialog } from '@radix-ui/react-dialog'
import React, { useState, useEffect } from 'react'
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { useUserContext } from '@/context/userContext'

function LogoutButton() {
  const { logoutUser } = useUserContext()

  // State to track whether the component is mounted to handle SSR hydration
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // Prevent rendering until mounted on the client
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-red-600 ml-1 mt-1 hover:bg-red-700 w-[14vw] mb-2 rounded-[10px] p-2">
        <span className='text-white'>Logout</span>
      </DialogTrigger>

      <DialogContent className='p-8 bg-gray-800 border-none shadow-lg'>
        <DialogHeader className='gap-2'>
          <DialogTitle className='text-gray-100'>Do you really want to Logout from StudyHive?</DialogTitle>
          <DialogDescription className='text-sm text-gray-400'>
            This action cannot be undone. This will logout your account from StudyHive.
          </DialogDescription>
          <div className='flex items-center justify-center'>
            <DialogPrimitive.Close className='mr-3'>
              <span className="bg-slate-900 hover:bg-slate-950 p-3 pl-10 pr-10 mb-2 rounded-[10px]">
                <span className='text-white'>Cancel</span>
              </span>
            </DialogPrimitive.Close>
            <DialogPrimitive.Close>
                <button onClick={logoutUser} className='text-white bg-red-600 hover:bg-red-700 pl-10 pr-10 mb-2 rounded-[10px] p-3'>Logout</button>
            </DialogPrimitive.Close>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default LogoutButton
