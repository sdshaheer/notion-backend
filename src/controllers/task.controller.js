const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const taskService = require('../services/task.service')

const createTask = catchAsync(async (req, res) => {
    const result = await taskService.createTask(req);
    res.status(httpStatus.OK).send(result);
});

const allTasks = catchAsync(async (req, res) => {
    const result = await taskService.allTasks(req);
    res.status(httpStatus.OK).send(result);
});

const updateTask = catchAsync(async (req, res) => {
    const result = await taskService.updateTask(req);
    res.status(httpStatus.OK).send(result);
});

const taskDetails = catchAsync(async (req, res) => {
    const result = await taskService.taskDetails(req);
    res.status(httpStatus.OK).send(result);
});

const deleteTask = catchAsync(async (req, res) => {
    const result = await taskService.deleteTask(req);
    res.status(httpStatus.OK).send(result);
});

module.exports = {
    createTask,
    allTasks,
    updateTask,
    taskDetails,
    deleteTask
}