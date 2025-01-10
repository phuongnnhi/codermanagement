const express = require('express')
const router = express.Router()
const {createUser, getUsers, searchUserByName, getUserTasks} = require("../controllers/user.controllers.js")
const { validateUser, validateId } = require('../middleware/validators');

//Read
/**
 * @route GET api/user
 * @description get list of users
 * @access private
 * @allowQueries: name
 */
router.get("/", getUsers)

//Create
/**
 * @route POST api/user
 * @description create an user
 * @access private, manager
 * @allowQueries: name
 */
router.post("/", validateUser, createUser)

//Search
/**
 * @route GET api/user
 * @description search user by name
 * @access public
 */
router.get("/search", searchUserByName)

//Get task by ID
/**
 * @route GET api/user
 * @description get task by ID
 * @access public
 */
router.get("/:id/tasks", validateId, getUserTasks)

module.exports = router;
