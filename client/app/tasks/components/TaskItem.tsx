import React from 'react'
import { FilePenLine, Star, Trash2 } from 'lucide-react'
import { edit, star, trash } from "@/utils/Icons";
import { Task } from '@/utils/types'
import { formatTime } from '@/utils/utilities'
import { useTasksContext } from '@/context/taskContext.js'
import Modal from './Modal';

interface TaskProps {
  task: Task
}


function TaskItem({task} : TaskProps) {

  const {deleteTask, getTask, openModalForEdit} = useTasksContext()



  const priorityColor = (priority: string) => {
    if (priority == 'Low') {
      return 'text-green-500'
    } else if (priority == 'Medium') {
      return 'text-yellow-500'
    } else if (priority == 'High') {
      return 'text-red-500'
    } else {
      return 'text-green-500'
    }
  }

  return (
    <div className='flex flex-col justify-between bg-gray-700 p-4 rounded-lg h-48 m-[5px] '>
        <div className='flex flex-col'>
          <span className='mb-1 mt-1 text-gray-300 bg-gray-600 p-2 rounded-lg'>{task.title}</span>
          <textarea name="" disabled id="" className='text-sm p-2 text-gray-200 bg-gray-500 rounded-lg mt-1 overflow-x-scroll resize-none' rows={2} >
            {task.description}
          </textarea>
        </div>
        <div className='flex flex-row gap-3 text-sm justify-between'>
          <span className='text-slate-500 '>{formatTime(task.createdAt)}</span>
          <span className={`${priorityColor(task.priority)}`}>{task.priority}</span>
          <div className='flex flex-row gap-1'>
          <Star width={20} height={20} color='white' className={`${task.completed ? 'bg-yellow-500' : 'bg-slate-400'}   p-[3px] hover:bg-yellow-500 active:bg-yellow-500 rounded-xl cursor-pointer`}
            />
            {/* <UpdateTaskModel /> */}

            <Modal task={task}/>
            <Trash2 onClick={() => {deleteTask(task._id)}} width={20} height={20} color='white' className='bg-red-500 p-[3px] hover:bg-red-600 rounded-xl cursor-pointer'/>
          </div>
        </div> 
        
    </div>
  )
}

export default TaskItem