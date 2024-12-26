import express from 'express';
import {
    createTimetableEntry,
    getTimetableEntries,
    updateTimetableEntry,
    deleteTimetableEntry
} from '../controllers/timetable.controller.js';
import { protect } from '../middleware/authentcationMiddleware.js'; // Adjust the path as necessary

const router = express.Router();

// Route to get all timetable entries
router.get('/', protect, getTimetableEntries);

// Route to create a new timetable entry
router.post('/create', protect, createTimetableEntry);

// Route to update a timetable entry
router.put('/:id', protect, updateTimetableEntry); // Update an entry

// Route to delete a timetable entry
router.delete('/:id', protect, deleteTimetableEntry); // Delete an entry

export default router;