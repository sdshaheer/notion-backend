const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        taskName: {
            type: String,
            required: [true, 'Task name is required']
        },
        todos: [{
            type: Schema.Types.ObjectId,
            ref: 'Todo',
        }],

    },
    {
        collection: 'task',
        timestamps: true
    },
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
