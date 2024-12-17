import jwt from 'jsonwebtoken'
import User from '../models/authentication/user.model.js'

export const protect = async (req, res, next) => {
    try {
        // check if user logged in
        const token = req.cookies.token

        if(!token) {
            return res.status(401).json({message: 'Not authorized, please ligin!'})
        }

        // verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // get user details from the token without the passcode
        const user = await User.findById(decoded.id).select('-password')

        // check if user exists
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        // set user details in the req object
        req.user = user

        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Token failed'
        })
    }
}