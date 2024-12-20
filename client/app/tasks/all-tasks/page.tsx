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
      <motion.div className='grid grid-cols-3'>
            {filtered.map((task: Task, i: number) => (
              <TaskItem key={i} task={task} />
            ))}
        </motion.div>
        <motion.button>
          Add New Task
        </motion.button>
      </div>
  )
}

export default page