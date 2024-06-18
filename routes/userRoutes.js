// contains routes related to player operations
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");


router.get('/:user_id', userController.readUserById); //Endpoint 3
router.get('/', userController.readAllUser); //Endpoint 2

router.post("/register", bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

router.delete('/:user_id', userController.deleteUserById); //Endpoint 5

router.put('/:user_id', userController.updateUsersById); // endpoint4
router.post('/loginuser', userController.loginUser); // endpoint4

module.exports = router;