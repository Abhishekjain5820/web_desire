

const express = require('express');
const router = express.Router();
const { registerController, loginController } = require('../controller/userController');

// Define user registration route
router.post('/register', registerController);

// Define user login route
router.post('/login', loginController);

module.exports = router;
