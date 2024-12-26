// api/controllers/timetableController.js
import Timetable from '../models/timetable/timetable.model.js';

// Create a new timetable entry
export const createTimetableEntry = async (req, res) => {
    try {
        const newEntry = new Timetable(req.body);
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all timetable entries
export const getTimetableEntries = async (req, res) => {
    try {
        const entries = await Timetable.find();
        res.status(200).json(entries);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a timetable entry
export const updateTimetableEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedEntry = await Timetable.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a timetable entry
export const deleteTimetableEntry = async (req, res) => {
    try {
        const { id } = req.params;
        await Timetable.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};