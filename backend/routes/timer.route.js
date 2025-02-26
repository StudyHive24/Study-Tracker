import express from 'express';
const router = express.Router();
import {
    getTimers,
    createTimer,
    deleteAllTimers,
    topUsersByTimeSpent
    
} from '../controllers/timer.controller.js';
import { protect } from '../middleware/authentcationMiddleware.js';

//route to get all timer entries
router.get('/',  protect,getTimers);

//route to create a new timer entry
router.post('/create', protect,createTimer);

// to delete all timer info
router.delete('/delete/all', protect, deleteAllTimers)


router.get('/top-users', topUsersByTimeSpent)



export default router