const User = require("../models/User")
const Task = require("../models/Task")

//create user
exports.createUser = async(req, res) => {
    try {
        const {name, role} = req.body;
        if(!name || !role) {
            return res.status(400).json({error: "Name and role are required"})
        }

        const user = new User({
            name,
            role: role || 'employee'
        });

        await user.save();
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({error:"Server error"});
    }
};

//get all users with filter
const normalizeInput = (input) => {
    return input ? input.trim().toLowerCase().replace(/\s+/g, '').replace(/\u200B/g, '') : '';
};
exports.getUsers = async(req, res) => {
    try {
        const query = req.query;

        // Initialize filter object
        const filter = {};

        // Normalize and filter by role if provided
        if (query.role) {
            filter.role = normalizeInput(query.role);  // Normalize role
        }

        // Normalize and filter by name if provided
        if (query.name) {
            filter.name = { $regex: normalizeInput(query.name), $options: 'i' };  // Case-insensitive partial match
        }

        // Query the database with the filter
        const users = await User.find(filter);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: "Server error"})
    }
}

//search user by name
exports.searchUserByName = async (req, res) => {
    try {
        const {name} = req.query;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const normalizedInput = normalizeInput(name);  // Normalize input

        // Search for users by name with partial matching
        const users = await User.find({
            name: { $regex: normalizedInput, $options: 'i' },  // Case-insensitive regex
        });
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error:"Server error"})
    }
}

//Get tasks by userID
exports.getUserTasks = async (req, res) => {
    try{
    const {id} = req.params;
    const user = await User.findById(id);

    if(!user) {
        return res.status(404).json({error:"User not found"})
    }

    const tasks = await Task.find({assignedTo: id, deleted: false})
    res.status(200).json(tasks)
} catch (error) {
    res.status(500).json({error: "Server error"})
}
}