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
    const [topUsers, setTopUsers] = React.useState([]); 
  
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
        setLoading(true);
      
        try {
          const res = await axios.patch(
            `${serverUrl}/api/tasks/update/${task._id}`,
            task // Send updated task data in the request body
          );
      
          // Update the task in the tasks array
          const newTasks = tasks.map((task) =>
            task._id === res.data._id ? res.data : task
          );
      
          toast.success("Task updated successfully");
          setTasks(newTasks);
        } catch (error) {
          console.error("Error updating task:", error);
          toast.error("Failed to update task");
        } finally {
          setLoading(false);
        }
      };

    // delete a task
    const deleteTask = async (taskID) => {
        try {
            await axios.delete(`${serverUrl}/api/tasks/delete/${taskID}`)

            // remove the task from the task array
            const newTasks = tasks.filter((t) => t._id !== taskID)

            setTasks(newTasks)

            toast.success('Task is deleted successfully')

        } catch (error) {
            console.log('Error deleting task', error)
            toast.error('Error in deleting the task')
        }
    }

    const deleteAllTasks = async (res, req) => {
        try {
            res = await axios.delete(`${serverUrl}/api/tasks/delete/all`)

            if (res.status == 200) {
                setTasks([])
                toast.success('Every tasks deleted Successfully')
            } else {
                toast.error('')
            }
            

        } catch (error) {
            console.log(error)
            toast.error('Error in deleting all')
        }
    }

    const getTopUsersByCompletion = async () => {
        try {
            const res = await axios.get(`${serverUrl}/api/tasks/topusers`);
            
            // Check if the data is structured correctly before setting it
            if (res.data.topUsers) {
                setTopUsers(res.data.topUsers);  // Set the top users data
            } else {
                console.error('No top users found in the response');
            }
        } catch (error) {
            console.error('Error fetching top users:', error);
        }
    };
    

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

      const handleInputDate = (name) => (e) => {
        
      }

    // to get completed tasks
    const completedTasks = tasks.filter((task) => task.completed)

    // to get pending tasks
    const pendingTasks = tasks.filter((task) => !task.completed)

    // to get active tasks
    const activeTasks = tasks.filter((task) => task.status == 'active')
    

    useEffect(() => {
        getTasks()
        getTopUsersByCompletion(); 
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
            handleInput2,
            activeTasks,
            deleteAllTasks,
            getTopUsersByCompletion,
            topUsers
        }}>
            {children}
        </TaskContext.Provider>
    )
} 

export const useTasksContext = () => {
    return useContext(TaskContext)
}