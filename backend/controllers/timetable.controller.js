// api/controllers/timetableController.js
import Timetable from '../models/timetable/timetable.model.js';


// Get all timetable 
export const getTimetableEntries = async (req, res) => {
    try{
        const userID = req.user._id

        if (!userID) {
            res.status(400).json({
                message: 'User not found'
            })
        }

        const timetable = await Timetable.find({user: userID})

        res.status(200).json({
            length: timetable.length,
            timetable
        })

    }catch (error) {
        console.log('Error in getting timetable info: ', error)
        res.status(400).json({message: error.message});
    }
};

// Create a new timetable entry
export const createTimetableEntry = async (req, res) => {
    try {
        const {title, day, startTime, endTime, color} = req.body;

        //validate input
        if (!title || !day || !startTime || !endTime || !color ) {
            return res.status(400).json ({message: 'Title, day, startTime and endTime are required'});
        }
        const timetable = await Timetable.create ({title, day, startTime,endTime,color, user: req.user._id});
        await timetable.save()
        return res.status(201).json(timetable)

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a timetable entry
export const deleteTimetableEntry = async (req, res) => {
    try {
        const userID = req.user._id
        const { id } = req.params;

        const entry = await Timetable.findOne({ _id: id, user: userID });

        if (!entry) {
            return res.status(404).json({ message: 'Timetable entry not found' });
        }

        await Timetable.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a timetable entry
export const updateTimetableEntry = async (req, res) => {
    try {
        const userID = req.user._id
        const { id } = req.params;
        const { title, day, duedate, startTime, endTime, color } = req.body
        
        const updatedEntry = await Timetable.findOneAndUpdate(
            { _id: id, user: userID }, 
            { title, day, duedate, startTime, endTime, color },
            { new: true }
        );
        
        if (!updatedEntry) {
            return res.status(404).json({ message: 'Timetable entry not found' });
        }

        res.status(200).json(updatedEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



// // Create a new timetable entry
// export const createTimetableEntry = async (req, res) => {
//     try {
//         const newEntry = new Timetable(req.body);
//         await newEntry.save();
//         res.status(201).json(newEntry);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Get all timetable entries
// export const getTimetableEntries = async (req, res) => {
//     try {
//         const entries = await Timetable.find();
//         res.status(200).json(entries);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Update a timetable entry
// export const updateTimetableEntry = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedEntry = await Timetable.findByIdAndUpdate(id, req.body, { new: true });
//         res.status(200).json(updatedEntry);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Delete a timetable entry
// export const deleteTimetableEntry = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await Timetable.findByIdAndDelete(id);
//         res.status(204).send();
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };