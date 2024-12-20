import express from 'express';
const router = express.Router();
import {
    getTimers,
    createTimer,
    
} from '../controllers/timer.controller.js';

//route to get all timer entries
router.get('/', getTimers);

//route to create a new timer entry
router.post('/', createTimer);



export default router