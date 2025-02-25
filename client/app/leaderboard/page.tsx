'use client'
import { useTasksContext } from '@/context/taskContext'
import { useTimerContext } from '@/context/timerContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import blankImg from '@/public/blank_profile.webp'

function page() {
    
    

    const { topUsers } = useTasksContext()

    const {topUsersTime} = useTimerContext()

    

  return (
<div className='m-8 flex flex-row gap-5'>
    <div className='w-4/6'>
    <h2 className='text-lg text-gray-100 text-center p-5 bg-gray-700 rounded-xl'>Top 10 Users by Task Completion</h2>
    <ul>
        <li>
            <div className='text-gray-100 bg-gray-600 text-center grid grid-cols-5 mt-3 p-3 rounded-lg'>
            <span>Name</span>
            <span>Total Tasks</span>
            <span>Completed Tasks</span>
            <span>Pending Tasks</span>
            <span>Completed Percentage</span>
            </div>
        </li>
        {topUsers.map((user: any, index: any) => (
            <li key={index} className="mb-4 mt-3">
                <div className="text-gray-100 bg-gray-500 text-center grid grid-cols-5 p-5 rounded-xl gap-3 justify-center items-center">
                    <div className='flex p-2 flex-col'>
                        <Image src={user.image || blankImg} width={60} height={10} className='max-h-24 rounded-2xl' alt='userImg'/>
                        
                    <span className=' text-gray-200 text-center mt-2'> {user.name}</span>
                    </div>
                    <span className='p-6 text-center text-yellow-400 bg-gray-600 rounded-2xl'> {user.totalTasks}</span>
                    <span className=' p-6 text-green-300 bg-gray-600 rounded-2xl'> {user.completedTasks}</span>
                    <span className='p-6 text-red-300 bg-gray-600 rounded-2xl'> {user.totalTasks - user.completedTasks}</span>
                    <span className='p-6 text-blue-300 bg-gray-600 rounded-2xl text-center'> {user.completionPercentage.toFixed(2)}%</span>
                </div>
            </li>
        ))}
    </ul>
    </div>
    <div className='w-2/6'>
            <h2 className='text-lg text-gray-100 text-center p-5 bg-gray-700 rounded-xl'>Top 10 Users by Time Spent</h2>
            <ul>
            <li>
            <div className='text-gray-100 bg-gray-600 text-center grid grid-cols-2 mt-3 p-3 rounded-lg'>
                <span>Name</span>
                <span>Time Spent</span>

            </div>
        </li>
                {topUsersTime.map((user: any, index:any) => (
                    <li key={index} className="mb-4 mt-3">
                        <div className="text-gray-100 bg-gray-500 text-center grid grid-cols-2 p-5 rounded-xl">
                        <span className="border-r-2 p-2 text-gray-300">{user.name}</span>
                        <span className=" p-2 text-red-300">{user.totalTimeSpent} seconds</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
</div>

  )
}

export default page