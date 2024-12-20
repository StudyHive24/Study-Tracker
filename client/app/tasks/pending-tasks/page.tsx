'use client'
import React from 'react'
import { TaskHeader } from '../components/TaskHeader'
import TasksSubHeader from '../components/TasksSubHeader'
import Task from '../components/TaskItem'
import useRiderect from '@/hooks/useUserRiderect'

function page() {

  useRiderect('/login')

  return (
    <div>
        <TaskHeader/>
        <TasksSubHeader title={"Overdue Tasks"}/>
        <div className='grid grid-cols-3 gap-2 mt-3'>
            <Task title={"Task1"} description={"lorem ipsm "} priority={"Low"} time={"Yesterday"} color={"text-green-500"}/>
            <Task title={"Task1"} description={"Description 1"} priority={"Medium"} time={"Yesterday"} color={"text-yellow-500"}/>
            <Task title={"Task1"} description={"Description 1"} priority={"High"} time={"Yesterday"} color={"text-red-500"}/>
            <Task title={"Task1"} description={"Description 1"} priority={"Low"} time={"Yesterday"} color={"text-yellow-500"}/>
            <Task title={"Task1"} description={"Description 1"} priority={"Low"} time={"Yesterday"} color={"text-yellow-500"}/>
        </div>
    </div>
  )
}

export default page