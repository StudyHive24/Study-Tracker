const express = require('express')
const router = express.Router()
const {getTasks, createTask, getTask, updateTask, deleteTask, deleteAllTasks} = require('../controllers/task.controller.js')

// to get all tasks
router.get('/', getTasks)

// to delete all tasks
router.delete('/all', deleteAllTasks)

// to create a task
router.post('/', createTask)

// to get a task
router.get('/:id', getTask)

// to update a task
router.put('/:id', updateTask)

// to delete a task
router.delete('/:id', deleteTask)


module.exports = router