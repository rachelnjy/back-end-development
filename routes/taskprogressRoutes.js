// contains routes related to player operations
const express = require('express');
const router = express.Router();
const taskprogressController = require('../controllers/taskprogressController');

router.get('/progress/:user_id/:task_id', taskprogressController.readTaskProgressByUserIdAndTaskId); // endpoint 15

router.get('/:progress_id', taskprogressController.readTaskProgressById); //Endpoint 12

router.post('/', taskprogressController.createTaskProgress); // endpoint 11

router.put('/:progress_id', taskprogressController.updateTaskProgressById) // endpoint 13

router.delete('/:progress_id', taskprogressController.deleteTaskProgressById) //endpoint 14

module.exports = router;