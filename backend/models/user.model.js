const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter a username"]
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

model.exports = User