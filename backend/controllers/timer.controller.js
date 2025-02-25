import Timer from '../models/timer/timer.model.js';
import convertDurationToSeconds from '../helpers/convertDuationtoSecs.js'

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

export const deleteAllTimers = async (req, res) => {
    try {
        const userID = req.user._id;

        const timers = await Timer.find({ user: userID });

        if (!timers || timers.length === 0) { // Also ensure tasks are not an empty array
            return res.status(404).json({
                message: 'No time information found',
            });
        }

        // Delete all tasks for the user
        await Timer.deleteMany({ user: userID });

        res.status(200).json({
            message: 'All timer information have been deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

export const topUsersByTimeSpent = async (req, res) => {
    try {
        const leaderboard = await Timer.aggregate([
            {
                $addFields: {
                    durationParts: {
                        $map: {
                            input: { $split: ['$duration', ':'] }, // Split "mm:ss" into parts
                            as: 'part',
                            in: { $toInt: '$$part' } // Convert each part to an integer
                        }
                    }
                }
            },
            {
                $addFields: {
                    durationInSeconds: {
                        $add: [
                            { $multiply: [{ $arrayElemAt: ['$durationParts', 0] }, 60] }, // Minutes to seconds
                            { $arrayElemAt: ['$durationParts', 1] } // Seconds
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: '$user', // Group by user ID
                    totalTimeSpent: { $sum: '$durationInSeconds' }
                }
            },
            {
                $lookup: {
                    from: 'users', // Reference to the User model
                    localField: '_id',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            {
                $unwind: '$userDetails' // Flatten the array to get user details
            },
            {
                $project: {
                    _id: 0,
                    name: '$userDetails.name', // Get the user's name
                    image: '$userDetails.image',
                    totalTimeSpent: 1
                }
            },
            {
                $sort: { totalTimeSpent: -1 } // Sort by total time spent in descending order
            },
            {
                $limit: 10 // Get the top 10 users
            }
        ]);

        return res.json({ topUsersByTimeSpent: leaderboard });
    } catch (error) {
        console.error('Error fetching top users by time spent', error);
        return res.status(500).json({ message: 'Server error' });
    }
};




