import Task from '../models/tasks/task.model.js'
import asyncHandler from 'express-async-handler'

export const createTask = asyncHandler(async (req, res) => {
    try {
        const { title, description, duedate, startTime, endTime, status, completed, priority, tags, attachments } =  req.body
        
            if (!title || title.trim() === '') {
                res.status(400)
                return res.json({
                    message: 'Title is required'
                })
            }

            if (!description || description.trim() === '') {
                res.status(400)
                return res.json({
                    message: 'Description is required'
                })
            }

            const task = new Task({
                title,
                description,
                duedate,
                startTime,
                endTime,
                status,
                completed,
                priority,
                tags,
                attachments,
                user: req.user._id
            })

            await task.save()

            return res.status(201).json(task)

    } catch (error) {
        console.log('Error in creating task: ', error.message)
    }
})

export const getTasks = asyncHandler(async (req, res) => {
    try {
        const userID = req.user._id

        if (!userID) {
            res.status(400).json({
                message: 'User not found'
            })
        }

        const tasks = await Task.find({user: userID})

        res.status(200).json({
            length: tasks.length,
            tasks
        })

    } catch (error) {
        console.log('Error in getting tasks: ', error.message)
        res.status(400).json({
            message: error.message
        })
    }
})

export const getTask = async (req, res) => {
    try {
        const userID = req.user._id

        const {id} = req.params

        if (!id) {
            res.status(400)
            res.json({
                message: 'Please add a task id'
            })
        }

        const task = await Task.findById(id)

        if (!task) {
            res.status(404)
            res.json({
                message: 'Task not found'
            })
        }

        if (!task.user.equals(userID)) {
            res.status(401)
            res.json({
                message: 'please log in'
            })
        }

        return res.status(200).json(task)


    } catch (error) {
        console.log('Error in getting the task: ', error.message)
        res.status(500)
        return res.json({
            message: error.message
        })
    }
}

export const updateTask = async (req, res) => {
    try {
        const userID = req.user._id

        const {id} =  req.params
        const { title, description, duedate, startTime, endTime, status, completed, priority, tags, attachments } = req.body

        if(!id) {
            res.status(400)
            res.json({
                message: 'Task id cannot be found'
            })
        }

        const task = await Task.findById(id)

        if (!task) {
            res.status(400)
            return res.json({
                message: 'Task cannot be found'
            })
        }

        // to check the user is the owner of the task
        if (!task.user.equals(userID)) {
            res.status(401)
            return res.json({
                message: 'Please login'
            })
        }

        // update the task
        task.title = title || task.title
        task.description = description || task.description
        task.duedate = duedate || task.duedate
        task.startTime = startTime || task.startTime
        task.endTime = endTime || task.endTime
        task.status = status || task.status
        task.completed = completed || task.completed
        task.priority = priority || task.priority
        task.tags = tags || task.tags
        task.attachments = attachments || task.attachments

        await task.save()

        return res.status(201).json(task)

    } catch (error) {
        console.log('Error in updating the task: ', error.message)
        res.status(500)
        return res.json({
            message: error.message
        })
    }
}

export const deleteTask = async (req, res) => {
    try {
        
        const userID = req.user._id

        const {id} = req.params

        const task = await Task.findById(id)

        if (!task) {
            res.status(401)
            res.json({
                message: 'Task cannot be found'
            })
        }

        // check the user is the owner of the task
        if (!task.user.equals(userID)) {
            res.status(401)
            res.json({
                message: 'Please login'
            })
        }

        await Task.findByIdAndDelete(id)

        res.status(200)
        return res.json({
            message: 'Task deleted successfully!'
        })

    } catch (error) {
        console.log('Error in deleteing the task: ', error.message)
        res.status(500)
        res.json({
            message: error.message
        })
    }
}

export const deleteAllTasks = async (req, res) => {
    try {
        const userID = req.user._id

        const tasks = await Task.find({user: userID})

        if (!tasks) {
            res.status(404)
            res.json({
                message:'No tasks found'
            })
        }

        // check the owner of the task
        if (!tasks.user.equals(userID)) {
            res.status(401)
            res.json({
                message: 'Please login'
            })
        }

        await Task.deleteMany({user: userID})

        res.status(200)
        res.json({
            message: 'All tasks deleted successfully!'
        })

    } catch (error) {
        console.log('Error in deleting tasks: ', error.message)
        res.status(500)
        res.json({
            message: error.message
        })
    }
}