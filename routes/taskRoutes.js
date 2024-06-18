// contains routes related to player operations
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/:task_id', taskController.readTaskById); //Endpoint 8
router.get('/', taskController.readAllTasks); //Endpoint 7

router.post('/', taskController.createNewTasks); //Endpoint 6

router.put('/:task_id', taskController.updateTaskById); //endpoint 9

router.delete('/:task_id', taskController.deleteTaskById); //endpoint 10


router.get('/:user_id/uncompleted', taskController.fetchUncompletedTasks);
router.get('/:user_id/completed',  taskController.fetchCompletedTasks);
router.post('/:user_id/complete/:task_id', taskController.markTaskAsCompleted);

module.exports = router;