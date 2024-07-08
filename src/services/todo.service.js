const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const logger = require('../config/logger')
const Todo = require('../models/todo.model')
const Task = require('../models/task.model')

const { getUserWithUuidFromMongo } = require('./mongo.service')

const createTodo = async (req) => {
    try {
        const { task, title, description } = req.body

        const newTodo = new Todo({
            task,
            title,
            description
        })

        const savedTodo = await newTodo.save()
        await Task.findByIdAndUpdate(
            task,
            { $push: { todos: savedTodo?._id } },
            { new: true }
        )
        return savedTodo
    } catch (error) {
        const status = error?.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const details = error?.message || 'something went wrong';
        logger.error(error);
        throw new ApiError(status, details);
    }
};

const allTodoByTask = async (req) => {
    try {
        const { taskId } = req.query
        const todos = await Todo.find({ task: taskId }).sort({ updatedAt: -1 });
        return todos
    } catch (error) {
        const status = error?.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const details = error?.message || 'something went wrong';
        logger.error(error);
        throw new ApiError(status, details);
    }
};

const updateTodo = async (req) => {
    try {
        const { mongoUser } = req
        const { todoId, ...others } = req?.body

        const updatedTodo = await Todo.findOneAndUpdate({ _id: todoId }, { ...others }, { new: true })
        return updatedTodo

    } catch (error) {
        const status = error?.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const details = error?.message || 'something went wrong';
        logger.error(error);
        throw new ApiError(status, details);
    }
};

const todoDetails = async (req) => {
    try {
        const { todoId } = req.query
        console.log(todoId)
        const todo = await Todo.findById(todoId).populate('task')
        return todo

    } catch (error) {
        const status = error?.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const details = error?.message || 'something went wrong';
        logger.error(error);
        throw new ApiError(status, details);
    }
};

const deleteTodo = async (req) => {
    try {
        const { mongoUser } = req
        const { todoId } = req.body;

        const deletedTodo = await Todo.findByIdAndDelete(todoId)

        // pull todo from source task
        await Task.findByIdAndUpdate(deletedTodo.task, { $pull: { todos: todoId } })

        return deletedTodo

    } catch (error) {
        const status = error?.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const details = error?.message || 'something went wrong';
        logger.error(error);
        throw new ApiError(status, details);
    }
};

const moveTodo = async (req) => {
    try {
        const { mongoUser } = req
        const { source, destination, destinationIndex, todo } = req?.body

        await Todo.findByIdAndUpdate(todo, { task: destination }, { new: true })

        // pull todo from source task
        await Task.findByIdAndUpdate(source, { $pull: { todos: todo } })

        // find the destination task
        const destinationTask = await Task.findById(destination);

        destinationTask.todos.splice(destinationIndex, 0, todo);
        const updatedTask = await destinationTask.save();
        return updatedTask

    } catch (error) {
        const status = error?.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const details = error?.message || 'something went wrong';
        logger.error(error);
        throw new ApiError(status, details);
    }
};

module.exports = {
    createTodo,
    allTodoByTask,
    updateTodo,
    todoDetails,
    deleteTodo,
    moveTodo
}