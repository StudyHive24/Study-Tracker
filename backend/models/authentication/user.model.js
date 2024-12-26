import mongoose from 'mongoose'
import { type } from 'os'

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter a username"]
        },

        email: {
            type: String,
            required: [true, 'Enter an email']
        },

        password: {
            type: String,
            required: [true, "Enter a password"]
        },
        photo: {
            type: String,
            default: ''
        },
        bio: {
            type: String,
            default: 'I am a new user'
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationCode: {
            type: String,
            default: null
        },
        verificationCodeExpires: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        minimize: true
    }
)

const User = mongoose.model("User", UserSchema)

export default User