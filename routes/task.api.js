const express = require('express')
const router = express.Router()
const {createTask, getTasks, getTaskById, updateTask, deleteTask, assignTask } = require("../controllers/task.controllers.js")
const { validateTask, validateId } = require('../middleware/validators');

//Read
/**
 * @route GET api/task
 * @description get list of tasks
 * @access public
 */
router.get("/", getTasks)

//Create
/**
 * @route POST api/task
 * @description create a task
 * @access private, manager
 */
router.post("/", validateTask, createTask)

//Read - Task by Id
/**
 * @route GET api/task
 * @description get a single task by ID
 * @access public
 */
router.get("/:id", validateId, getTaskById)

//Update
/**
 * @route PUT api/task
 * @description update task status
 * @access private, manager
 */
router.put("/:id", validateId, updateTask)

//Delete - soft delete task
/**
 * @route DELELE api/task
 * @description delete task
 * @access private, manager
 */
router.delete("/:id", validateId, deleteTask)

// Update - Assign or unassign a task to/from a user
/**
 * @route PATCH api/tasks/:id/assign
 * @description Assign or unassign a task to a user
 * @access public
 */
router.patch("/:id/assign", validateId, assignTask);

module.exports = router;