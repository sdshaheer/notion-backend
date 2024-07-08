const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema(
    {
        task: {
            type: Schema.Types.ObjectId,
            ref: 'Task',
        },
        title: {
            type: String,
            required: [true, 'Title is required for task']
        },
        description: {
            type: String,
        }
    },
    {
        collection: 'todo',
        timestamps: true
    },
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
