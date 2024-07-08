const express = require('express');

const todoController = require('../controllers/todo.controller');

const router = express.Router();

router.post('/createTodo', todoController.createTodo);
router.get('/allTodoByTask', todoController.allTodoByTask);
router.put('/updateTodo', todoController.updateTodo);
router.get('/todoDetails', todoController.todoDetails);
router.post('/moveTodo', todoController.moveTodo);
router.delete('/deleteTodo', todoController.deleteTodo);



module.exports = router;
