import express from 'express';
import { protect } from '../middleware/authentcationMiddleware.js';
import { 
  createTimetable,
  getTimetables,
  updateTimetable,
  deleteTimetable
} from '../controllers/timetable.controller.js';

const router = express.Router();

// Route to get all timetable entries
router.get('/', protect, getTimetables);

// Route to create a new timetable entry
router.post('/create', protect, createTimetable);

// Route to update a timetable entry
router.put('/:id', protect, updateTimetable);

// Route to delete a timetable entry
router.delete('/:id', protect, deleteTimetable);

export default router;
