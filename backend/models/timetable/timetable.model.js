
import mongoose from 'mongoose';


const timetableSchema = new mongoose.Schema({
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  title: { type: String, required: true },
  subject: { type: String, required: true },
  subjectColor: { type: String, default: "#F0A1C2" }, // Default color
});

// Named export
const Timetable = mongoose.model('Timetable', timetableSchema);
export default Timetable 