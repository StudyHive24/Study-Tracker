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
    }
);

const Timer = mongoose.model("Timer", timerSchema);

export default Timer