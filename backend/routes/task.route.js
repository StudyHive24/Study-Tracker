import express from 'express'
import {getTasks, createTask, getTask, updateTask, deleteTask, deleteAllTasks} from '../controllers/task.controller.js'
import { protect } from '../middleware/authentcationMiddleware.js'

const router = express.Router()

// to get all tasks
router.get('/', protect ,getTasks)

// to delete all tasks
router.delete('/all', deleteAllTasks)

// to create a task
router.post('/create', protect, createTask)

// to get a task
router.get('/:id', getTask)

// to update a task
router.put('/:id', updateTask)

// to delete a task
router.delete('/:id', deleteTask)


export default router