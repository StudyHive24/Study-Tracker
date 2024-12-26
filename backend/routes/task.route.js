import express from 'express'
import {getTasks, createTask, getTask, updateTask, deleteTask, deleteAllTasks, topUsers} from '../controllers/task.controller.js'
import { protect } from '../middleware/authentcationMiddleware.js'

const router = express.Router()

// to get all tasks
router.get('/', protect ,getTasks)

// to delete all tasks
router.delete('/delete/all', protect, deleteAllTasks)

// to create a task
router.post('/create', protect, createTask)

// to get a task
router.get('/task/:id', protect, getTask)

// to update a task
router.patch('/update/:id', protect, updateTask)

// to delete a task
router.delete('/delete/:id', protect, deleteTask)

router.get('/topusers', protect, topUsers)


export default router