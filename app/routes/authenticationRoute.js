const express = require('express');
const routes = express.Router();
const authenticationController = require('../controllers/authenticationController')
 
routes.get('/login',authenticationController.show_login);
routes.get('/register',authenticationController.show_register);

module.exports = routes;