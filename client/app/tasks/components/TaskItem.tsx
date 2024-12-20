import React from 'react'
import { FilePenLine, Star, Trash2 } from 'lucide-react'
import { Task } from '@/utils/types'
import { formatTime } from '@/utils/utilities'

interface TaskProps {
  task: Task
}


function TaskItem({task} : TaskProps) {

  const priorityColor = (priority: string) => {
    if (priority == 'low') {
      return 'text-green-500'
    } else if (priority == 'medium') {
      return 'text-yellow-500'
    } else if (priority == 'high') {
      return 'text-red-500'
    } else {
      return 'text-green-500'
    }
  }

  return (
    <div className='flex flex-col justify-between bg-white p-4 rounded-lg h-48 m-[5px] '>
        <div className='flex flex-col'>
          <span className='mb-1 mt-1'>{task.title}</span>
          <span className='text-sm'>{task.description}</span>
        </div>
        <div className='flex flex-row gap-3 text-sm justify-between'>
          <span className='text-slate-500 '>{formatTime(task.createdAt)}</span>
          <span className={`${priorityColor(task.priority)}`}>{task.priority}</span>
          <div className='flex flex-row gap-1'>
            <Star width={20} height={20} color='white' className='bg-slate-400 p-[3px] hover:bg-yellow-500 active:bg-yellow-500 rounded-xl cursor-pointer'/>
            <FilePenLine width={20} height={20} color='white' className='bg-green-500 hover:bg-green-600 p-[3px] rounded-xl cursor-pointer'/>
            <Trash2 width={20} height={20} color='white' className='bg-red-500 p-[3px] hover:bg-red-600 rounded-xl cursor-pointer'/>
          </div>
        </div> 
    </div>
  )
}

export default TaskItem