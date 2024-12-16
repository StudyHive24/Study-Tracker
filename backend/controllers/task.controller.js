import Task from '../models/task.model.js'

// to get all tasks
export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// to create a task
export const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// to get a task
export const getTask = async (req, res) => {
    try {
        const {id} = req.params // to get the task id
        const task = await Task.findById(id)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// to update a task
export const updateTask = async (req, res) => {
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
export const deleteTask = async (req, res) => {
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
export const deleteAllTasks = async (req, res) => {
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


