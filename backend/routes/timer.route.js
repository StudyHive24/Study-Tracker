import express from 'express';
const router = express.Router();
import {
    getTimers,
    createTimer,
    
} from '../controllers/timer.controller.js';
import { protect } from '../middleware/authentcationMiddleware.js';

//route to get all timer entries
router.get('/',  protect,getTimers);

//route to create a new timer entry
router.post('/create', protect,createTimer);



export default router