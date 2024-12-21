import Timetable from '../models/time table/timetable.model.js';

// Get all timetable entries
export const getTimetable = async (req, res) => {
  try {
    const userID = req.user._id;

    if (!userID) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    const timetables = await Timetable.find({ user: userID });
    res.status(200).json({
      length: timetables.length,
      timetables,
    });
  } catch (error) {
    console.log('Error fetching timetable entries: ', error);
    res.status(500).json({ message: error.message });
  }
};

// Create a new timetable entry
export const createTimetable = async (req, res) => {
  try {
    const { date, startTime, endTime, title, subject, dayOfWeek, subjectColor } = req.body;

    // Validate input
    if (!date || !startTime || !endTime || !title || !subject || !dayOfWeek || !subjectColor) {
      return res.status(400).json({
        message: 'All fields are required: date, startTime, endTime, title, subject, dayOfWeek, subjectColor',
      });
    }

    const timetable = await Timetable.create({
      date,
      startTime,
      endTime,
      title,
      subject,
      dayOfWeek,
      subjectColor,
      user: req.user._id,
    });

    res.status(201).json(timetable);
  } catch (error) {
    console.log('Error creating timetable entry: ', error);
    res.status(500).json({ message: error.message });
  }
};

// Update an existing timetable entry
export const updateTimetable = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTimetable = await Timetable.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedTimetable) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }

    res.status(200).json(updatedTimetable);
  } catch (error) {
    console.log('Error updating timetable entry: ', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a timetable entry
export const deleteTimetable = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTimetable = await Timetable.findByIdAndDelete(id);

    if (!deletedTimetable) {
      return res.status(404).json({ message: 'Timetable entry not found' });
    }

    res.status(200).json({ message: 'Timetable entry deleted successfully' });
  } catch (error) {
    console.log('Error deleting timetable entry: ', error);
    res.status(500).json({ message: error.message });
  }
};
