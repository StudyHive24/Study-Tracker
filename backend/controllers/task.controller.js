const Task = require('../models/task.model.js')
const toast = require('react-hot-toast')

// to get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// to create a task
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// to get a task
const getTask = async (req, res) => {
    try {
        const {id} = req.params // to get the task id
        const task = await Task.findById(id)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// to update a task
const updateTask = async (req, res) => {
    try {
        const {id} =  req.params // to get the task id
        const task =  await Task.findByIdAndUpdate(id, req.body)

        if (!task) {
            return res.status(404).json({message: 'Task not found'})
        }

        const updatedTask = await Task.findById(id)   // to find the updated task
        res.status(200).json(updatedTask)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// to delete a task
const deleteTask = async (req, res) => {
    try {
        const {id} = req.params // to get the id
        const task =  await Task.findByIdAndDelete(id, req.body)

        if(!task) {
            return res.status(404).json({message: 'Task not found'})
        }
        
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// to delete all tasks
const deleteAllTasks = async (req, res) => {
    try {
        const task = await Task.deleteMany({})
        res.status(200).json({
            message: "All tasks have been deleted successfully.",
            deletedCount: task.deletedCount, // Number of documents deleted
        })
    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
}


module.exports = {
    getTasks, 
    createTask,
    getTask,
    updateTask,
    deleteTask,
    deleteAllTasks
}