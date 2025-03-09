import Task from '../models/tasks/task.model.js'
import asyncHandler from 'express-async-handler'


// create task
export const createTask = asyncHandler(async (req, res) => {
    try {
        const { title, description, duedate, startTime, endTime, status, completed, priority, tags, attachments } =  req.body

            // check if there is a title or not
            if(!title) {
                return res.json({
                    error: 'Title is required'
                })
            }

            // check if there a due date or not
            if (!duedate) {
                return res.json({
                    error: 'Duedate is required'
                })
            }

            // check if there is an end time or not
            if (!endTime) {
                return res.json({
                    error: 'End Time is required'
                })
            }

            
            

           
            // assign task values to the newly created task
            const task = new Task({
                title,
                description,
                duedate,
                startTime,
                endTime,
                status,
                completed,
                priority,
                tags,
                attachments,
                user: req.user._id
            })

            await task.save()

            return res.status(201).json(task)

    } catch (error) {
        console.log('Error in creating task: ', error.message)
        res.status(500)
        return res.json({
            message: error.message
        })
    }
})

// get tasks
export const getTasks = asyncHandler(async (req, res) => {
    try {
        // assign user id which is get from the request
        const userID = req.user._id

        // check if there is a user found or not
        if (!userID) {
            res.status(400).json({
                message: 'User not found'
            })
        }

        // find the tasks according to the user
        const tasks = await Task.find({user: userID})

        res.status(200).json({
            length: tasks.length,
            tasks
        })

    } catch (error) {
        console.log('Error in getting tasks: ', error.message)
        res.status(500)
        return res.json({
            message: error.message
        })
    }
})

// get a task
export const getTask = async (req, res) => {
    try {
        const userID = req.user._id

        const {id} = req.params

        if (!id) {
            res.status(400)
            res.json({
                message: 'Please add a task id'
            })
        }

        // find the task by it's id
        const task = await Task.findById(id)

        // check if there is a task found or not
        if (!task) {
            res.status(404)
            res.json({
                message: 'Task not found'
            })
        }

        // check the user's login status
        if (!task.user.equals(userID)) {
            res.status(401)
            res.json({
                message: 'please log in'
            })
        }

        return res.status(200).json(task)


    } catch (error) {
        console.log('Error in getting the task: ', error.message)
        res.status(500)
        return res.json({
            message: error.message
        })
    }
}

// update the task
export const updateTask = async (req, res) => {
    try {
        const userID = req.user._id

        const {id} =  req.params

        // get the task details from the reqeuest body
        const { title, description, duedate, startTime, endTime, status, completed, priority, tags, attachments } = req.body


        if(!id) {
            res.status(400)
            res.json({
                message: 'Task id cannot be found'
            })
        }

        // find the task by its task id
        const task = await Task.findById(id)

        if (!task) {
            res.status(400)
            return res.json({
                message: 'Task cannot be found'
            })
        }

        // to check the user is the owner of the task
        if (!task.user.equals(userID)) {
            res.status(401)
            return res.json({
                message: 'Please login'
            })
        }

        // update the task
        task.title = title || task.title
        task.description = description || task.description
        task.duedate = duedate || task.duedate
        task.startTime = startTime || task.startTime
        task.endTime = endTime || task.endTime
        task.status = status || task.status
        task.completed = completed || task.completed
        task.priority = priority || task.priority
        task.tags = tags || task.tags
        task.attachments = attachments || task.attachments

        // save the updated task
        await task.save()

        return res.status(201).json(task)

    } catch (error) {
        console.log('Error in updating the task: ', error.message)
        res.status(500)
        return res.json({
            message: error.message
        })
    }
}

// delete a task
export const deleteTask = async (req, res) => {
    try {
        
        const userID = req.user._id

        const {id} = req.params

        // find the task by its id
        const task = await Task.findById(id)

        if (!task) {
            res.status(401)
            res.json({
                message: 'Task cannot be found'
            })
        }

        // check the user is the owner of the task
        if (!task.user.equals(userID)) {
            res.status(401)
            res.json({
                message: 'Please login'
            })
        }

        // delete the task
        await Task.findByIdAndDelete(id)

        res.status(200)
        return res.json({
            message: 'Task deleted successfully!'
        })

    } catch (error) {
        console.log('Error in deleteing the task: ', error.message)
        res.status(500)
        res.json({
            message: error.message
        })
    }
}
 // to delete all tasks (this function is currently removed from the production code base)
export const deleteAllTasks = async (req, res) => {
    try {
        const userID = req.user._id;

        // find the tasks which are created by a specific user
        const tasks = await Task.find({ user: userID });

        if (!tasks || tasks.length === 0) { // Also ensure tasks are not an empty array
            return res.status(404).json({
                message: 'No tasks found',
            });
        }

        // Delete all tasks for the user
        await Task.deleteMany({ user: userID });

        res.status(200).json({
            message: 'All tasks have been deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

// get the top 10 users by task completion
export const topUsers = async (req, res) => {
    try {
        // aggregate task count, completed tasks, and pending tasks by user
        const usersWithTaskData = await Task.aggregate([
            {
                $group: {
                    _id: '$user',  // group by user ID
                    totalTasks: { $sum: 1 },
                    completedTasks: { $sum: { $cond: [{ $eq: ['$completed', 'yes'] }, 1, 0] } },
                    pendingTasks: { $sum: { $cond: [{ $eq: ['$completed', 'no'] }, 1, 0] } }
                }
            },
            {
                $lookup: {
                    from: 'users',  
                    localField: '_id', 
                    foreignField: '_id',  
                    as: 'userDetails'  
                }
            },
            {
                $unwind: '$userDetails'  
            },
            {
                $project: {
                    _id: 1,
                    name: '$userDetails.name',  // get the user's name
                    image: '$userDetails.image',  // get the user's image
                    totalTasks: 1,
                    completedTasks: 1,
                    pendingTasks: 1,
                    completionPercentage: { 
                        $cond: {
                            if: { $eq: ['$totalTasks', 0] }, 
                            then: 0, 
                            else: { $multiply: [{ $divide: ['$completedTasks', '$totalTasks'] }, 100] }
                        }
                    }
                }
            },
            { $sort: { completedTasks: -1 } },  // sort completed tasks in descending order
            { $limit: 10 }  // Get the top 10 users by task completion
        ]);

        return res.json({ topUsers: usersWithTaskData });
    } catch (error) {
        console.error('Error fetching top users', error);
        return res.status(500).json({ message: 'Server error' });
    }
};