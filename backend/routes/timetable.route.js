import express from 'express';
const router = express.Router();
import {
    getTimetableEntries,
    createTimetableEntry,
    updateTimetableEntry,
    deleteTimetableEntry,
    deleteAllTimetableEntries,
} from '../controllers/timetable.controller.js';
import { protect } from '../middleware/authentcationMiddleware.js';

// Route to get all timetable entries
router.get('/', protect, getTimetableEntries);

// Route to create a new timetable entry
router.post('/create', protect, createTimetableEntry);

// Route to update a specific timetable entry by ID
router.put('/:id', protect, updateTimetableEntry);

// Route to delete a specific timetable entry by ID
router.delete('/:id', protect, deleteTimetableEntry);

// Route to delete all timetable entries
router.delete('/delete/all', protect, deleteAllTimetableEntries);

export default router;