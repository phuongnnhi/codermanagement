const express = require('express');
const userRoutes = require('./user.api');
const taskRoutes = require('./task.api');

const router = express.Router();

app.get('/', (req, res) => {
    res.send('Welcome to the Homepage! Please go to /api/users for users api, and /api/tasks for tasks api');
});

router.use('/api/users', userRoutes);
router.use('/api/tasks', taskRoutes);

module.exports = router;