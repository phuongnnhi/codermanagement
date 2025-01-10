const Joi = require('joi')
const mongoose = require('mongoose')

//validateUser
const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    role: Joi.string().valid('manager', 'employee').default('employee')
})

const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
  
  //validate userId
  const validateId = (req, res, next) => {
    const idSchema = Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Invalid ID format');
      }
      return value;
    });
  
    const { error } = idSchema.validate(req.params.id);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };

  // Schema for task validation
const taskSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).required(),
    status: Joi.string()
      .valid('pending', 'working', 'review', 'done', 'archive')
      .default('pending'),
    assignedTo: Joi.string().optional().allow(null), // Validate ObjectID or allow null
  });
  
  // Middleware for task validation
  const validateTask = (req, res, next) => {
    const { error } = taskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };

  module.exports = {validateUser, validateId, validateTask};