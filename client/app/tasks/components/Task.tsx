import React from 'react'
import { FilePenLine, Star, Trash2 } from 'lucide-react'

interface UserProps {
  title: String,
  description: String,
  time: String,
  priority: String,
  color: String
}


function Task({title, description, time, priority, color} : UserProps) {
  return (
    <div className='flex flex-col justify-between bg-white p-4 rounded-lg h-48 m-[5px] '>
        <div className='flex flex-col'>
          <span className='mb-1 mt-1'>{title}</span>
          <span className='text-sm'>{description}</span>
        </div>
        <div className='flex flex-row gap-3 text-sm justify-between'>
          <span className='text-slate-500 '>{time}</span>
          <span className={`${color}`}>{priority}</span>
          <div className='flex flex-row gap-1'>
            <Star width={20} height={20} color='white' className='bg-slate-400 p-[3px] hover:bg-yellow-500 active:bg-yellow-500 rounded-xl cursor-pointer'/>
            <FilePenLine width={20} height={20} color='white' className='bg-green-500 hover:bg-green-600 p-[3px] rounded-xl cursor-pointer'/>
            <Trash2 width={20} height={20} color='white' className='bg-red-500 p-[3px] hover:bg-red-600 rounded-xl cursor-pointer'/>
          </div>
        </div> 
    </div>
  )
}

export default Task