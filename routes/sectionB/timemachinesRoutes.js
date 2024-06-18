const express = require('express');
const router = express.Router();
const timemachinesController = require('../../controllers/sectionB/timemachinesController');

router.get('/timemachines', timemachinesController.readAllTimeMachines); // endpoint 7

router.post('/timemachines/select', timemachinesController.createNewTimeMachines); // endpoint 8

module.exports = router;