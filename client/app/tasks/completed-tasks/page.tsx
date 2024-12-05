import React from 'react'
import { TaskHeader } from '../components/TaskHeader'
import TasksSubHeader from '../components/TasksSubHeader'
import Task from '../components/Task'

function page() {
  return (
    <div>
        <TaskHeader/>
        <TasksSubHeader title={"Completed Tasks"}/>
        <div className='grid grid-cols-3 gap-2 mt-3'>
            <Task title={"Task1"} description={"lorem ipsm "} priority={"Low"} time={"Yesterday"}/>
            <Task title={"Task1"} description={"Description 1"} priority={"Low"} time={"Yesterday"}/>
            <Task title={"Task1"} description={"Description 1"} priority={"Low"} time={"Yesterday"}/>
            <Task title={"Task1"} description={"Description 1"} priority={"Low"} time={"Yesterday"}/>
            <Task title={"Task1"} description={"Description 1"} priority={"Low"} time={"Yesterday"}/>
        </div>
    </div>
  )
}

export default page