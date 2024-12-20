import Timer from '../models/timer/timer.model.js';

//get all timer entries
export const getTimers = async (req, res) => {
    try {
        const userID = req.user._id

        if (!userID) {
            res.status(400).json({
                message: 'User not found'
            })
        }

        const timers = await Timer.find ({user: userID});
        res.status(200).json({
            length: timers.length,
            timers
        });
    } catch (error) {
        console.log('Error in creating timer info: ', error)
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

        const timer = await Timer.create ({title, duration, date, user: req.user._id});
        res.status(201).json(timer);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

