const express = require('express');
const userRoutes = require('./user.api');
const taskRoutes = require('./task.api');

const router = express.Router();

router.use('/api/users', userRoutes);
router.use('/api/tasks', taskRoutes);

module.exports = router;