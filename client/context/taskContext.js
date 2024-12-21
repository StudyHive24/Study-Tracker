'use client'
import axios from 'axios'
import React, { createContext, useEffect, useState, useContext } from 'react'
import { useUserContext } from '../context/userContext.js'
import toast from 'react-hot-toast'

const TaskContext = createContext()

const serverUrl = 'http://localhost:8000'

export const TasksProvider = ({children}) => {

    const userID = useUserContext().user._id;

    const [tasks, setTasks] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [task, setTask] = React.useState({});
  
    const [isEditing, setIsEditing] = React.useState(false);
    const [priority, setPriority] = React.useState("all");
    const [activeTask, setActiveTask] = React.useState(null);
    const [modalMode, setModalMode] = React.useState("");
    const [profileModal, setProfileModal] = React.useState(false);
  
    const openModalForAdd = () => {
      setModalMode("add");
      setIsEditing(true);
      setTask({});
    };
  
    const openModalForEdit = (task) => {
      setModalMode("edit");
      setIsEditing(true);
      setActiveTask(task);
    };
  
    const openProfileModal = () => {
      setProfileModal(true);
    };
  
    const closeModal = () => {
      setIsEditing(false);
      setProfileModal(false);
      setModalMode("");
      setActiveTask(null);
      setTask({});
    };

    // get tasks
    const getTasks = async () => {
        setLoading(true)

        try {
            const res = await axios.get(`${serverUrl}/api/tasks`)

            setTasks(res.data.tasks)

            return res.json(tasks)
        } catch (error) {
            return console.log('Error getting tasks', error)
            
        }

        setLoading(false)
    }

    // get task
    // get a task by ID
const getTask = async (taskID) => {
    try {
        // Make a GET request to fetch the task by ID
        const response = await axios.get(`${serverUrl}/api/tasks/task/${taskID}`);
        
        // Extract the task data from the response
        const task = response.data;

        console.log('Task fetched successfully:', task);

        return task; // Return the fetched task
    } catch (error) {
        console.error('Error fetching task', error);
        return null; // Handle error gracefully
    }
};
    
    // create a task
    const createTask = async (task) => {

        try {
            const res = await axios.post(`${serverUrl}/api/tasks/create`, task)

            console.log('Task created', res.data)

            setTasks([...tasks, res.data])
            toast.success('Task created succcessfully')

        } catch (error) {
            console.log('Error in creating a task', error)
            toast.error("Error in Creating the task")
        }
    }

    // update a task
    const updateTask = async (task) => {
        setLoading(true)
        

        try {
            const res =  await axios.patch(`${serverUrl}/api/tasks/update/${task._id}`)

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
        try {
            await axios.delete(`${serverUrl}/api/tasks/delete/${taskID}`)

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

    const handleInput2 = (name) => (e) => {
        if (name === 'setTask') {
            setTask(e)
        } else {
            setTask({...task, [name]: e.target.value})
        }
      };

    // to get completed tasks
    const completedTasks = tasks.filter((task) => task.completed)

    // get pending tasks
    const pendingTasks = tasks.filter((task) => !task.completed)

    useEffect(() => {
        getTasks()
    }, [userID])



    return (
        <TaskContext.Provider value={{
            tasks,
            loading,
            task,
            tasks,
            getTask,
            getTasks,
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
            handleInput2

        }}>
            {children}
        </TaskContext.Provider>
    )
} 

export const useTasksContext = () => {
    return useContext(TaskContext)
}