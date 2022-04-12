const express = require('express');
const { verify } = require('jsonwebtoken');
const verifyToken = require("../middleware/verifyToken");
const check_noLogin = require("../middleware/check_noLogin");
const routes = express.Router();
const authenticationController = require('../controllers/authenticationController')

/* không xác thực */
routes.get('/login', check_noLogin, authenticationController.show_login);
routes.get('/register', check_noLogin, authenticationController.show_register);
routes.get('/forgotpassword', check_noLogin, authenticationController.show_forgotPassword);

/* có xác thực */
routes.get('/updateinformation', verifyToken, authenticationController.show_update);
routes.get('/changepassword', verifyToken, authenticationController.show_changePassword);
routes.get('/logout', verifyToken, authenticationController.logout);

/* không xác thực */
routes.post('/register', check_noLogin, authenticationController.register);
routes.post('/login', check_noLogin, authenticationController.login);
routes.post('/resetpassword', check_noLogin, authenticationController.resetPassword);
routes.post('/changepassword', check_noLogin, authenticationController.changePassword);

/* có xác thực */
routes.post('/updateinformation', verifyToken, authenticationController.updateInformation);
routes.post('/updatepassword', verifyToken, authenticationController.change_password);

module.exports = routes;