import mongoose from 'mongoose';

// Schema for the timetable
const timetableSchema = new mongoose.Schema(
    {
        date: {
            type: String,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        subject: {
            type: String,
            required: true,
        },
        dayOfWeek: {
            type: String,
            required: true,
        },
        subjectColor: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt timestamps
    }
);

const Timetable = mongoose.model("Timetable", timetableSchema);

export default Timetable;
