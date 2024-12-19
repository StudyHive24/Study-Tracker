"use client"

import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Dialog } from '@radix-ui/react-dialog'
import React from 'react'
import * as DialogPrimitive from "@radix-ui/react-dialog"
import User from './User'
import { useUserContext } from '@/context/userContext'

function LogoutButton() {
  const {logoutUser} = useUserContext()
  return (
        <Dialog>
          <DialogTrigger className="bg-red-600 hover:bg-red-700 w-[13vw] mb-2 rounded-[10px] p-2">
                <span className='text-white'>Logout</span>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader className='gap-2'>
              <DialogTitle>Do you really want to Logout from StudyHive?</DialogTitle>
              <DialogDescription className='text-sm'>
                This action cannot be undone. This will logout your account
                from StudyHive.
              </DialogDescription>
              <DialogDescription className='h-[13vh] mb-8'>
                <div>
                  <User width={80} height={100}/>
                </div>               
              </DialogDescription>
              <div className='flex items-center justify-center'>
                <DialogPrimitive.Close className='mr-3'>
                  <Button className="bg-slate-600 hover:bg-slate-700 w-[13vw] mb-2 rounded-[10px]">
                    <span className='text-white'>Cancel</span>
                  </Button>
                </DialogPrimitive.Close>
                <DialogPrimitive.Close>
                <Button onClick={logoutUser} className="bg-red-600 hover:bg-red-700 w-[13vw] mb-2 rounded-[10px] p-2">
                  <span onClick={logoutUser} className='text-white'>Logout</span>
                </Button>
                </DialogPrimitive.Close>
              </div>
            </DialogHeader>
          </DialogContent>
</Dialog>
  )
}

export default LogoutButton