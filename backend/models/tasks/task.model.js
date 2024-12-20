import mongoose from 'mongoose'

const TaskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'title'],
            unique: true,
        },
        description: {
            type: String,
            required: false
        },
        duedate: {
            type: Date,
            required: [true, "duedate"]
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        },
        completed: {
            type: Boolean,
            default: false
        },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            required: [true, 'priority']
        },
        tags: [{ type: String, required: false}], 
        attachments: [{
            type: String,
            required: false
        }],
        attachments: {
            type: String,
            default: ''
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
)



const Task = mongoose.model("Task", TaskSchema)

export default Task
