const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const todoService = require('../services/todo.service')

const createTodo = catchAsync(async (req, res) => {
    const result = await todoService.createTodo(req);
    res.status(httpStatus.OK).send(result);
});

const allTodoByTask = catchAsync(async (req, res) => {
    const result = await todoService.allTodoByTask(req);
    res.status(httpStatus.OK).send(result);
});

const updateTodo = catchAsync(async (req, res) => {
    const result = await todoService.updateTodo(req);
    res.status(httpStatus.OK).send(result);
});

const todoDetails = catchAsync(async (req, res) => {
    const result = await todoService.todoDetails(req);
    res.status(httpStatus.OK).send(result);
});

const moveTodo = catchAsync(async (req, res) => {
    const result = await todoService.moveTodo(req);
    res.status(httpStatus.OK).send(result);
});

const deleteTodo = catchAsync(async (req, res) => {
    const result = await todoService.deleteTodo(req);
    res.status(httpStatus.OK).send(result);
});




module.exports = {
    createTodo,
    allTodoByTask,
    updateTodo,
    moveTodo,
    todoDetails,
    deleteTodo
}