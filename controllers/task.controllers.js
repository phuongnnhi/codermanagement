const Task = require("../models/Task");
const User = require("../models/User");

//create Task
exports.createTask = async(req, res) => {
    try {
        const {name, description, status, assignedTo} = req.body;
            if (!name || !description || !status) {
                return res.status(400).json({ error: 'Name, description, and status are required' });
            }
        
            const task = new Task({
                name,
                description,
                status,
                assignedTo: assignedTo || null
            });

            await task.save();
            res.status(200).json(task)
    } catch (error) {
        res.status(500).json({error:"Server error"})
    }
};

//Get all tasks with filter
exports.getTasks = async (req, res) => {
    try {
        const query = {...req.query, deleted: false};
        const tasks = await Task.find(query)
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({error: "Server error"})
    }
}

//get task by ID
exports.getTaskById = async(req, res) => {
    try {
        const {id} = req.params;
        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).json({error: "Task not found"})
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({error:"Server error"})
    }
}

//Update task status
exports.updateTask = async(req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body;
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        // Check if the task status is 'done' and if the new status is not 'archive'
        if (task.status === 'done' && status !== 'archive') {
            return res.status(400).json({ error: 'Cannot change task status from done to another status except archive' });
        }

        // Update the task with the new status
        task.status = status;
        task.updatedAt = new Date(); // Correct the typo: `updatedAt` instead of `updateAt`

        // Save the updated task
        await task.save();
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({error: "Server error"})
    }
}

//soft delete task
exports.deleteTask = async (req, res) => {
    try {
       const {id} = req.params;
       const task = await Task.findByIdAndUpdate(id, {deleted: true}, {new: true})
       if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully', task });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

// Assign or Unassign Task to/from User
exports.assignTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const task = await Task.findById(id);
        const user = await User.findById(userId);

        if (!task || !user) {
            return res.status(404).json({ error: 'Task or User not found' });
        }

        if (task.assignedTo !== null) {
            task.assignedTo = null;
            await task.save();
            return res.status(200).json({ message: 'Task unassigned', task });
        }

        task.assignedTo = userId;
        await task.save();

        res.status(200).json({ message: task.assignedTo ? 'Task assigned' : 'Task unassigned', task });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};