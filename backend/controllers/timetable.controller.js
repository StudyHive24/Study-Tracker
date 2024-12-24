import Timetable from '../models/timetable/timetable.model.js';

// Fetch all timetable entries for the authenticated user
export const getTimetables = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    const timetables = await Timetable.find({ user: req.user._id });
    res.status(200).json({ timetables });
  } catch (error) {
    console.error("Error fetching timetables:", error.message);
    res.status(500).json({ message: 'Error retrieving timetables.' });
  }
};

// Create a new timetable entry
export const createTimetable = async (req, res) => {
  try {
    console.log("Incoming Request Body:", req.body); 
    const { date, startTime, endTime, title, subject, dayOfWeek, subjectColor } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    if (!date || !startTime || !endTime || !title || !subject || !dayOfWeek || !subjectColor) {
      return res.status(400).json({ message: 'All fields are required.' });
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
    console.error("Error creating timetable:", error.message);
    res.status(500).json({ message: 'Error creating timetable entry.' });
  }
};

// Update a timetable entry
export const updateTimetable = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, startTime, endTime, title, subject, dayOfWeek, subjectColor } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    const timetable = await Timetable.findOne({ _id: id, user: req.user._id });
    if (!timetable) {
      return res.status(404).json({ message: 'Timetable entry not found.' });
    }

    timetable.date = date || timetable.date;
    timetable.startTime = startTime || timetable.startTime;
    timetable.endTime = endTime || timetable.endTime;
    timetable.title = title || timetable.title;
    timetable.subject = subject || timetable.subject;
    timetable.dayOfWeek = dayOfWeek || timetable.dayOfWeek;
    timetable.subjectColor = subjectColor || timetable.subjectColor;

    await timetable.save();

    res.status(200).json(timetable);
  } catch (error) {
    console.error("Error updating timetable:", error.message);
    res.status(500).json({ message: 'Error updating timetable entry.' });
  }
};

// Delete a timetable entry
export const deleteTimetable = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    const timetable = await Timetable.findOneAndDelete({ _id: id, user: req.user._id });
    if (!timetable) {
      return res.status(404).json({ message: 'Timetable entry not found.' });
    }

    res.status(200).json({ message: 'Timetable entry deleted successfully.' });
  } catch (error) {
    console.error("Error deleting timetable:", error.message);
    res.status(500).json({ message: 'Error deleting timetable entry.' });
  }
};

export const deleteAllTimetables = async (req, res) => {
  try {
      const userID = req.user._id;

      const timetables = await Timetable.find({ user: userID });

      if (!timetables || timetables.length === 0) { // Also ensure timetables are not an empty array
          return res.status(404).json({
              message: 'No timetables found',
          });
      }

      // Delete all timetables for the user
      await Task.deleteMany({ user: userID });

      res.status(200).json({
          message: 'All timetables have been deleted successfully',
      });
  } catch (error) {
      res.status(500).json({
          message: 'Server error',
          error: error.message,
      });
  }
};