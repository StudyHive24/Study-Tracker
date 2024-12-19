import axios from 'axios'
import React, { createContext, useState } from 'react'
import { useUserContext } from '../context/userContext'
import toast from 'react-hot-toast'

const TaskContext = createContext()

const serverUrl = 'http://localhost:8000'

export const TasksProvider = ({children}) {

    const userID =  useUserContext.user._id

    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)
    const [task, setTask] = useState({})

    const [isEditing, setIsEditing] = useState(false)
    const []


    return (
        <TaskContext.Provider value={
            
        }>
            {children}
        </TaskContext.Provider>
    )
} 

export const useTasks = () => {
    return React.useContext(TaskContext)
}