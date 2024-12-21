import express from 'express';
const router = express.Router();
import {
    getTimetable,
    createTimetable,
    updateTimetable,
    deleteTimetable
} from '../controllers/timetable.controller.js';
import { protect } from '../middleware/authentcationMiddleware.js';

// Route to get all timetable entries
router.get('/', protect, getTimetable);

// Route to create a new timetable entry
router.post('/create', protect, createTimetable);

// Route to update an existing timetable entry
router.put('/:id', protect, updateTimetable);

// Route to delete a timetable entry
router.delete('/:id', protect, deleteTimetable);

export default router;
