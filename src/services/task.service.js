const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const logger = require('../config/logger')
const Task = require('../models/task.model')
const { getUserWithUuidFromMongo } = require('./mongo.service')

const createTask = async (req) => {
    try {
        const { taskName } = req.body
        const { mongoUser } = req

        const newTask = new Task({
            user: mongoUser?._id,
            taskName: taskName
        })

        const savedTask = await newTask.save()
        return savedTask

    } catch (error) {
        const status = error?.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const details = error?.message || 'something went wrong';
        logger.error(error);
        throw new ApiError(status, details);
    }
};

const allTasks = async (req) => {
    try {
        const { mongoUser } = req

        const tasks = await Task.find({ user: mongoUser?._id }).populate('todos')
        return tasks

    } catch (error) {
        const status = error?.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const details = error?.message || 'something went wrong';
        logger.error(error);
        throw new ApiError(status, details);
    }
};

const updateTask = async (req) => {
    try {
        const { mongoUser } = req
        const { taskId, ...others } = req?.body

        const updatedTask = await Task.findOneAndUpdate({ _id: taskId, user: mongoUser._id }, { ...others }, { new: true })
        return updatedTask

    } catch (error) {
        const status = error?.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const details = error?.message || 'something went wrong';
        logger.error(error);
        throw new ApiError(status, details);
    }
};

const taskDetails = async (req) => {
    try {
        const { taskId } = req.query

        const task = await Task.findById(taskId).populate('todos')
        return task

    } catch (error) {
        const status = error?.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const details = error?.message || 'something went wrong';
        logger.error(error);
        throw new ApiError(status, details);
    }
};

const deleteTask = async (req) => {
    try {
        const { mongoUser } = req
        const { taskId } = req.body;

        const deletedTask = await Task.findByIdAndDelete(taskId)

        return deletedTask

    } catch (error) {
        const status = error?.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
        const details = error?.message || 'something went wrong';
        logger.error(error);
        throw new ApiError(status, details);
    }
};

module.exports = {
    createTask,
    allTasks,
    updateTask,
    taskDetails,
    deleteTask
}