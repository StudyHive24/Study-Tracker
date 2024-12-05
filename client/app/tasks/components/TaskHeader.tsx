import { Button } from '@/components/ui/button'
import { Hand } from 'lucide-react'
import React from 'react'

export function TaskHeader() {
  return (
    <div className='flex flex-row justify-between bg-[#e4f0ff] rounded-2xl p-2'>
        <div className='flex flex-col gap-1'>
            <div className='flex flex-row gap-3'>
                <Hand color='orange'/>
                <span>Welcome, Madhuka Abhishek!</span>
            </div>
            <span>You have <span className='text-green-500'>5</span> Active tasks</span>
        </div>
        <Button className='bg-green-500 hover:bg-green-600 rounded-3xl mt-1'>Add A New Task</Button>
    </div>
  )
}