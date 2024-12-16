import mongoose from 'mongoose'

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
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", UserSchema)

export default User