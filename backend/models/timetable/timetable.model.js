import mongoose from 'mongoose';

const timetableEntrySchema = new mongoose.Schema(
    {
        day: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        title: { type: String, required: true },
        color: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

const TimetableEntry = mongoose.model('TimetableEntry', timetableEntrySchema);

export default TimetableEntry; 