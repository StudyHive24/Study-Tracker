import express from 'express'
const router = express.Router()
import { registerUser, loginUser, getUsers, getUser, logoutUser, updateUser, userLoginStatus, emailVerify, verifyUser, forgotPassowrd, changePassword, resetPassword } from '../controllers/user.controller.js'
import { protect } from '../middleware/authentcationMiddleware.js'

// to get all users
router.get('/', getUsers)


// to register a user
router.post('/register', registerUser)

// to login a user
router.post('/login', loginUser)

// to update the user
router.patch('/user', protect, updateUser)

// to logout a user
router.get('/logout', logoutUser)

// email verification
router.post('/verify-email', protect, emailVerify)

// to get a profile of the user
// router.get('/profile', getProfile)


// to get a user
router.get('/user', protect, getUser)

// user login status
router.get('/login-status', userLoginStatus)


// to verify user , after the email verification
router.post('/verify-user/:verificationToken', verifyUser)

// forgot password
router.post('/forgot-password', forgotPassowrd)

//reset passwrord
router.post('/reset-password/:resetPasswordToken', resetPassword)

// change password
router.patch('/change-password', protect, changePassword)

export default router