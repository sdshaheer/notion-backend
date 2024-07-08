const express = require('express');

const taskController = require('../controllers/task.controller');

const router = express.Router();

router.post('/createTask', taskController.createTask);
router.get('/allTasks', taskController.allTasks);
router.put('/updateTask', taskController.updateTask);
router.get('/taskDetails', taskController.taskDetails);
router.delete('/deleteTask', taskController.deleteTask);



module.exports = router;
