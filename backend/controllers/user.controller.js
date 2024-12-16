import { hashPassword, comparePasswords } from '../helpers/user.js'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'


export const test = (req, res) => {
    res.json('test is working')
}

// register user
export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body
        // check if name was entered
        if (!name) {
            return res.json({
                error: 'name is required'
            })
        }
        // check if password is good
        if(!password || password.length < 8) {
            return res.json({
                error: 'Password is required and should be at least 8 characters long'
            })
        }
        // check email
        const exist = await User.findOne({email})
        if(exist) {
            return res.json({
                error: 'email is taken already'
            })
        }

        const hashedPassword = await hashPassword(password)

        // create the user
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword,
        })

        return res.json(user)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// login endpoint
export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        // check if user exists
        const user = await User.findOne({email})

        if(!user) {
            return res.status(404).json({
                message: 'no user found'
            })
        }

        // check if passwords match
        const match = await comparePasswords(password, user.password)

        if(match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user)
            })
        }
        if (!match) {
            res.status(404).json({
                error: 'passwords do not match'
            })
        }

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.json({message: error.message})
    }
}

// get user
export const getUser = async (req, res) => {
    // get user details from the token ---> excluding the password
    const user = await User.findById(req.user._id).select('-password')

    if (user) {
        res.status(200).json(user)
    } else {
        // 404 not found
        res.status(404).json({
            message: 'User not found'
        })
    }
}

export const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

