import Timetable from '../models/timetable/timetable.model.js';

export const createTimetable = async (req, res) => {
  try {
    const newEntry = new Timetable(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find();
    res.status(200).json({ timetables });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTimetable = async (req, res) => {
  try {
    const updatedEntry = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEntry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTimetable = async (req, res) => {
  try {
    await Timetable.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
