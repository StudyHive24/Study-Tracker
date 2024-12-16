import express from 'express'
const router = express.Router()
import { registerUser, loginUser, getUsers, getUser } from '../controllers/user.controller.js'

// to get all users
router.get('/', getUsers)

// to register a user
router.post('/register', registerUser)

// to login a user
router.post('/login', loginUser)

// to get a profile of the user
// router.get('/profile', getProfile)

// to get a user
router.get('/user', getUser)

export default router