const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    status: {
        type: String,
        enum: ['pending', 'working', 'review', 'done', 'archive'],
        default: 'pending'
    },
    assignedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null},
    deleted: {type: Boolean, default: false}},
    {timestamps: true})

    module.exports = mongoose.model('Task', taskSchema)