import mongoose from 'mongoose'

const TaskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'title'],
            unique: true,
            index: true
        },
        description: {
            type: String,
            required: false
        },
        priority: {
            type: String,
            enum: ['Low', 'Medium', 'High'],
            required: [true, 'priority']
        },
        status: {
            type: String,
            enum: ['Pending', 'In Progress', 'Completed'],
            default: 'Pending'
        },
        duedate: {
            type: Date,
            required: [true, "duedate"]
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        category: {
            type: String,
            required: false
        },
        tags: [{ type: String, required: false}], 
        updatedAt: {
            type: Date,
            required: false
        },
        star: {
            type: String,
            required: false
        },
        progress: {
            type: Number,
            min: 0, max: 100,
            required: false
        },
        attachments: [{
            type: String,
            required: false
        }],
        // subtasks: [{
        //     title: String,
        //     isCompleted: Boolean,

        // }],
        estimatedTime: {
            type: Number,
            required: false
        },
        timeSpent: {
            type: Number,
            required: false
        }, 
        createdBy: {
            type: String,
            required: [true, 'user']
        },
        // user: {
        //     type: mongoose.Schema.ObjectId,
        //     ref: "User",
        //     required: true
        // }
    },
    {
        timestamps: true
    }
)



const Task = mongoose.model("Task", TaskSchema)

export default Task
