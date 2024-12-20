import mongoose from 'mongoose';


const timetableSchema = new mongoose.Schema({
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
  }
});

const Timetable= mongoose.model('Timetable', timetableSchema);
module.exports = Timetable;
