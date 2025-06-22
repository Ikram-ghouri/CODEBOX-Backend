const express = require('express');//Imports the Express framework to build the server and handle HTTP routes.
const router = express.Router();//Creates a new router instance to define routes for user authentication.
const authController = require('../controllers/authControllers');//Imports the authentication controller that contains the logic for user registration and login.

/**
 * User Routes
 */
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;