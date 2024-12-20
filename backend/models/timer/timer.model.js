import mongoose from 'mongoose';

//schema for the timer
const timerSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        duration: {
            type: String,
            required: true,
        },

        date: {
            type: Date,
            default: Date.now,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        }
    }
);

const Timer = mongoose.model("Timer", timerSchema);

export default Timer