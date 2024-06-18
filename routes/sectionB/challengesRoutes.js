const express = require('express');
const router = express.Router();
const challengesController = require('../../controllers/sectionB/challengesController');

router.post('/challenges', challengesController.createNewChallenges) // endpoint 9.1
router.get('/challenges', challengesController.readAllChallenges) // endpoint 11
router.get('/eras/:EraID/challenges', challengesController.readChallengesByEraId); // endpoint 9.2
router.post('/challenges/complete/:ChallengeID/:EraID/:user_id', challengesController.MarkChallengeCompleted); // endpoint 10

module.exports = router;
