const express = require('express');
const routes = express.Router();
const authenticationController = require('../controllers/authenticationController')
 
routes.get('/login',authenticationController.show_login);
routes.get('/register',authenticationController.show_register);

routes.post('/register',authenticationController.register);
routes.post('/login',authenticationController.login);

module.exports = routes;