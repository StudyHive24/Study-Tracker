import React from 'react'
import {useTasksContext} from '@/context/taskContext.js'

interface UserProps {
    title: String
}

function TasksSubHeader({title} : UserProps) {

  const { priority, setPriority } = useTasksContext()

  const [activeIndex, setActiveIndex] = React.useState(0)

  return (
    <div className='flex flex-row justify-between mt-2 border-b-2 p-2 border-blue-50 rounded-xl'>
        <span className='flex flex-col p-2 rounded-xl text-center justify-center text-base'>{title}</span>
        <div className=' flex gap-2 bg-[#e1e9f3] p-2 rounded-xl'>
            <span className='bg-[#c4d2e3] active:bg-[#acc7e8] hover:bg-[#acc7e8] cursor-pointer p-1 pr-4 pl-4 rounded-lg text-[13px]'>
              <button>All</button>
            </span>
            <span className='bg-[#c4d2e3] active:bg-[#acc7e8] hover:bg-[#acc7e8] cursor-pointer p-1 pr-3 pl-3 rounded-lg text-[13px]'>
              <button>Low</button>
            </span>
            <span className='bg-[#c4d2e3] active:bg-[#acc7e8] hover:bg-[#acc7e8] cursor-pointer p-1 pr-2 pl-2 rounded-lg text-[13px]'>
                <button>Medium</button>
            </span>
            <span className='bg-[#c4d2e3] active:bg-[#acc7e8] hover:bg-[#acc7e8] cursor-pointer p-1 pr-3 pl-3 rounded-lg text-[13px]'>
                <button>High</button>
            </span>
        </div>
    </div>
  )
}

export default TasksSubHeader