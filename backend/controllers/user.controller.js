import { hashPassword, comparePasswords } from '../helpers/user.js'
import jwt from 'jsonwebtoken'
import User from '../models/authentication/user.model.js'
import generateToken from '../helpers/generateToken.js'
import Token from '../models/authentication/Token.js'


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

        // check email is okay
        if(!email.includes('@')) {
            return res.json({
                error: 'Enter a valid email'
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

        // generate token with user id
        const token = generateToken(user._id)

        // send back the user and token in the response to the client
        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,   // 30 days
            sameSite: 'none',
            secure: false
        })

        if (user) {
            const {_id, name, email, role, photo, bio, isVerifed} = user

            // 201 created
            res.status(201).json({
                _id,
                name,
                email,
                role,
                photo,
                bio,
                isVerifed,
                token
            })
        }

        

    } catch (error) {
        return res.status(500).json({message: error.message})
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
                message: 'No user found, sign up!'
            })
        }

        // check if passwords match
        const match = await comparePasswords(password, user.password)

        if (!match) {
            return res.status(404).json({
                error: 'Invalid Credentials'
            })
        }

        const token =  generateToken(user._id)

        const { _id, name,  photo, bio, isVerifed } = user


        // set the token in the cookie
        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,     // 30 days
            sameSite: 'none',
            secure: true
         })

         // send back tot the user and token in the response to the client
         res.status(200).json({
            _id,
            name,
            email,
            photo,
            bio,
            isVerifed,
            token
         })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// logout user
export const logoutUser = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        path: '/'
    })

    res.status(200).json({
        message: 'User Logged out successfully'
    })
}

// update user details
export const updateUser = async (req, res) => {
    try {
        // get the user details from the token using protect middleware
        const user = await User.findById(req.user._id)

        if (user) {
            // properties to update
            const { name, bio, photo } = req.body

            // to update properties
            user.name = req.body.name || user.name
            user.bio = req.body.bio || user.bio
            user.photo = req.body.photo || user.photo

            // to save the updated data
            const updated = await user.save()

            res.status(200)
            res.json({
                _id: updated._id,
                name: updated.name,
                email: updated.email,
                photo: updated.photo,
                bio: updated.bio,
                isVerified: updated.isVerified
            })
        }
    } catch (error) {
        res.json({
            message: 'User not found'
        })
    }
}

// login status
export const userLoginStatus = async (req, res) => {
    const token = req.cookies.token

    if (!token) {
        res.status(401).json({
            message: 'Please login!'
        })
    
    }    

    try {
        // to verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded) {
            res.status(200).json(true)
        } else {
            res.status(401).json(false)
        }
    } catch (error) {
        res.status(401)
        return res.json({
            message: 'Invalid Token'
        })
    }   

}

// email verification



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
        return res.status(404).json({
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
        return res.json(null)
    }
}

