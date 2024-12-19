'use client'
import axios from 'axios'
import React, { createContext, useEffect, useState, useContext } from 'react'
import { useUserContext } from '../context/userContext.js'
import toast from 'react-hot-toast'

const TaskContext = createContext()

const serverUrl = 'http://localhost:8000'

export const TasksProvider = ({children}) => {

    const userID =  useUserContext().user._id

    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(false)
    const [task, setTask] = React.useState({})

    const [isEditing, setIsEditing] = useState(false)
    const [priority, setPriority] = useState("all")
    const [activeTask, setActiveTask] = useState(null)
    const [modalMode, setModalMode] = useState("")
    const [profileModal, setProfileModal] = useState(false)

    const openModalForAdd = () => {
        setModalMode('add')
        setIsEditing(true),
        setTask({})
    }

    const openModalForEdit = () => {
        setModalMode('edit')
        setIsEditing(true)
        setActiveTask(task)
    }

    const openProfileModal = () => {
        setProfileModal(true)
    }

    const closeModal = () => {
        setIsEditing(false)
        setProfileModal(false)
        setModalMode('')
        setActiveTask(null)
        setTask({})
    }

    // get tasks
    const getTasks = async () => {
        setLoading(true)

        try {
            const res = await axios.get(`${serverUrl}/api/tasks`)

            setTasks(res.data.tasks)
        } catch (error) {
            console.log('Error getting tasks', error)
        }

        setLoading(false)
    }

    // get task
    const getTask = async (taskID) => {
        setLoading(true)

        try {
            const res =  await axios.get(`${serverUrl}/api/tasks/${taskID}`)

            setTask(res.data)
        } catch (error) {
            console.log('Error getting task', error)
        }

        setLoading(false)
    }
    
    // create a task
    const createTask = async (task) => {
        setLoading(true)

        try {
            const res = await axios.post(`${serverUrl}/api/tasks/`, task)

            console.log('Task created', res.data)

            setTasks([...tasks, res.data])
            toast.success('Task created succcessfully')

        } catch (error) {
            console.log('Error getting a task', error)
        }

        setLoading(false)
    }

    // update a task
    const updateTask = async (task) => {
        setLoading(true)
        

        try {
            const res =  await axios.patch(`${serverUrl}/api/tasks/${task._id}`)

            // udpdate a task in the tasks array
            const newTasks =  tasks.map((t) => {
                return t._id === res.data._id ? res.data : t
            })

            toast.success('Task updated successfully')

            setTasks(newTasks)


        } catch (error) {
            console.log('Error updating a task', error)
        }
    }

    // delete a task
    const deleteTask = async (taskID) => {
        setLoading(true)

        try {
            await axios.delete(`${serverUrl}/api/tasks/${taskID}`)

            // remove the task from the task array
            const newTasks = tasks.filter((t) => t._id !== taskID)

            setTasks(newTasks)

        } catch (error) {
            console.log('Error deleting task', error)
        }
    }

    const handleInput = (name) => (e) => {
        if (name === 'setTask') {
            setTask(e)
        } else {
            setTask({...task, [name]: e.target.value})
        }
    }

    // to get completed tasks
    const completedTasks = tasks?.filter((task) => task.completed)

    // get pending tasks
    const pendingTasks = tasks?.filter((task) => !task.completed)

    useEffect(() => {
        getTasks()
    }, [userID])

    console.log('Active tasks', activeTask)


    return (
        <TaskContext.Provider value={{
            tasks,
            loading,
            task,
            tasks,
            getTask,
            createTask,
            updateTask,
            deleteTask,
            priority,
            setPriority,
            handleInput,
            isEditing,
            setIsEditing,
            openModalForAdd,
            openModalForEdit,
            activeTask,
            closeModal,
            modalMode,
            openProfileModal,
            pendingTasks,
            completedTasks,
            profileModal,
            
        }}>
            {children}
        </TaskContext.Provider>
    )
} 

export const useTasksContext = () => {
    return useContext(TaskContext)
}