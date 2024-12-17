import jwt from 'jsonwebtoken'

// use user id to generate the token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export default generateToken