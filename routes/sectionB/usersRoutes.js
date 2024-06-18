const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/sectionB/usersController');
const { verifyMiddleware } = require('../../services/verifyMiddleware');

router.post('/register', usersController.createUser); // endpoint 1
router.post('/login', usersController.loginUser); // endpoint 2


router.get('/readUserProfileById/:UserId', usersController.readUserProfileById); // endpoint 3
router.get('/readPointsByUser/:UserId/points', usersController.readPointsByUser); // endpoint 11
router.get('/search/users', verifyMiddleware, usersController.readSearchUserByUsername); // endpoint 12
router.get('/leaderboard', usersController.readLeaderboard); // endpoint 13

router.put('/updateUserProfileById/:UserId', usersController.updateUserProfileById); // endpoint 4

router.delete('/deleteUserProfileById/:UserId', usersController.deleteUserProfileById); // endpoint 5


module.exports = router;
