'use client'
import React, { useEffect } from 'react'
import { TaskHeader } from '../components/TaskHeader'
import TasksSubHeader from '../components/TasksSubHeader'
import useRiderect from '@/hooks/useUserRiderect'
import { useTasksContext } from '@/context/taskContext'
import { filteredTasks, overdueTasks } from '@/utils/utilities'
import { motion } from 'framer-motion'
import { Task } from '@/utils/types'
import TaskItem from '../components/TaskItem'
import AddTask from '../components/AddTask'

function page() {

  useRiderect('/login')

  const { tasks, priority, setPriority,  completedTasks} = useTasksContext()

  const overdue = overdueTasks(tasks)

  const filtered = filteredTasks(overdue, priority)

  useEffect(() => {
    setPriority('All')
  }, [])

  let totalTasks = completedTasks.length 

  

  return (
    <div>
      <TaskHeader totalTasks={totalTasks} Status={' Overdue Tasks'} firstPhrase={'There are '}/>
      <h1>Overdue Tasks</h1>
      <TasksSubHeader title={"All Tasks"}/>
      <motion.div className='mt-3 grid grid-cols-3 gap-2'>
            {filtered.map((task: Task, i: number) => (
              <TaskItem key={i} task={task} />
            ))}
        <motion.button className='
          hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out
        '>
        </motion.button>
        </motion.div>
      </div>
  )
}

export default page