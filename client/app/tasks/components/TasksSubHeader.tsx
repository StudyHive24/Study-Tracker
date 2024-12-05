import React from 'react'

interface UserProps {
    title: String
}

function TasksSubHeader({title} : UserProps) {
  return (
    <div className='flex flex-row justify-between mt-2 border-b-2 p-2 border-blue-50 rounded-xl'>
        <span className='flex flex-col p-2 rounded-xl text-center justify-center text-base'>{title}</span>
        <div className=' flex gap-2 bg-[#e1e9f3] p-2 rounded-xl'>
            <span className='bg-[#c4d2e3] active:bg-[#acc7e8] hover:bg-[#acc7e8] cursor-pointer p-1 pr-4 pl-4 rounded-lg text-[13px]'>All</span>
            <span className='bg-[#c4d2e3] active:bg-[#acc7e8] hover:bg-[#acc7e8] cursor-pointer p-1 pr-3 pl-3 rounded-lg text-[13px]'>Low</span>
            <span className='bg-[#c4d2e3] active:bg-[#acc7e8] hover:bg-[#acc7e8] cursor-pointer p-1 pr-2 pl-2 rounded-lg text-[13px]'>Medium</span>
            <span className='bg-[#c4d2e3] active:bg-[#acc7e8] hover:bg-[#acc7e8] cursor-pointer p-1 pr-3 pl-3 rounded-lg text-[13px]'>High</span>
        </div>
    </div>
  )
}

export default TasksSubHeader