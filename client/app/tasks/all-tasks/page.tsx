'use client'
import React, { useEffect } from 'react'
import { TaskHeader } from '../components/TaskHeader'
import TasksSubHeader from '../components/TasksSubHeader'
import AddTask from '../components/AddTask'
import useRiderect from '@/hooks/useUserRiderect'
import {motion} from 'framer-motion'
import { useTasksContext } from '@/context/taskContext'
import { filteredTasks } from '@/utils/utilities'
import { Task } from '@/utils/types'
import TaskItem from '../components/TaskItem'


function page() {

  useRiderect('/login')

  const { tasks, priority, setPriority } = useTasksContext()

  const filtered = filteredTasks(tasks, priority)

  useEffect(() => {
    setPriority('all')
  })

  return (

    <div>
      <TaskHeader/>
      <TasksSubHeader title={"All Tasks"}/>
      <motion.div className='grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2'>
            {filtered.map((task: Task, i: number) => (
              <TaskItem key={i} task={task} />
            ))}
        <motion.button className='border-dashed border-2 rounded-lg border-gray-400 mt-1 h-[12rem] w-[20vw]
          hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out
        '>
          Add New Task
        </motion.button>
        </motion.div>
      </div>
  )
}

export default page