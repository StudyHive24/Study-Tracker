'use client'
import React, { useEffect } from 'react'
import { TaskHeader } from '../components/TaskHeader'
import TasksSubHeader from '../components/TasksSubHeader'
import useRiderect from '@/hooks/useUserRiderect'
import { useTasksContext } from '@/context/taskContext'
import { filteredTasks } from '@/utils/utilities'
import { motion } from 'framer-motion'
import { Task } from '@/utils/types'
import TaskItem from '../components/TaskItem'
import AddTask from '../components/AddTask'

function page() {

  useRiderect('/login')

  const { tasks, priority, setPriority,  pendingTasks} = useTasksContext()

  const filtered = filteredTasks(pendingTasks, priority)

  useEffect(() => {
    setPriority('All')
  }, [])

  let totalTasks = pendingTasks.length 

  return (
    <div>
      <TaskHeader totalTasks={totalTasks} Status={'Active'} firstPhrase={'You have'}/>
      <TasksSubHeader title={"All Tasks"}/>
      <motion.div className='mt-3 grid grid-cols-3 gap-2'>
            {filtered.map((task: Task, i: number) => (
              <TaskItem key={i} task={task} />
            ))}
        </motion.div>
      </div>
  )
}

export default page