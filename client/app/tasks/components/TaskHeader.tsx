import { Button } from '@/components/ui/button'
import { Hand } from 'lucide-react'
import React from 'react'
import AddTaskModel from './AddTaskModel'
import { useTasksContext } from '@/context/taskContext'
import { useUserContext } from '@/context/userContext'
import AddTask from './AddTask'

interface TaskHeaderProps {
  totalTasks: string,
  Status: string,
  firstPhrase: string
}

export function TaskHeader({totalTasks, Status, firstPhrase} : TaskHeaderProps) {

  const {tasks , pendingTasks, task} = useTasksContext()

  const {user} = useUserContext()

  // const totalTasks = pendingTasks.length

  return (
    <div className='flex flex-row justify-between bg-white rounded-2xl p-2'>
        <div className='flex flex-col gap-1'>
            <div className='flex flex-row gap-3'>
                <Hand color='orange'/>
                <span>Welcome, <span className='font-bold'>{user.name}</span> !</span>
            </div>
            <span>{firstPhrase}<span className='text-green-500'>{totalTasks}</span> {Status}</span>
        </div>
        <AddTaskModel/>
    </div>
  )
}
