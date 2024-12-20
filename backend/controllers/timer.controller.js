import Timer from '../models/timer/timer.model.js';

//get all timer entries
export const getTimers = async (req, res) => {
    try {
        const timers = await Timer.find ({});
        res.status(200).json(timers);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//create a new timer entry
export const createTimer = async (req, res) => {
    try {
        const {title, duration, date} = req.body;
        //validate input
        if (!title || !duration || !date) {
            return res.status(400).json ({message: 'Title, duration, and date are required'});
        }

        const timer = await Timer.create ({title, duration, date});
        res.status(201).json(timer);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

