const express = require('express');
const { verify } = require('jsonwebtoken');
const verifyToken = require("../middleware/verifyToken");
const routes = express.Router();
const authenticationController = require('../controllers/authenticationController')

/* không xác thực */
routes.get('/login', authenticationController.show_login);
routes.get('/register', authenticationController.show_register);
routes.get('/forgotpassword', authenticationController.show_forgotPassword);

/* có xác thực */
routes.get('/updateinformation', verifyToken, authenticationController.show_update);
routes.get('/changepassword', verifyToken, authenticationController.show_changePassword);
routes.get('/logout', verifyToken, authenticationController.logout);

/* không xác thực */
routes.post('/register', authenticationController.register);
routes.post('/login', authenticationController.login);
routes.post('/resetpassword', authenticationController.resetPassword);
routes.post('/changepassword', authenticationController.changePassword);

/* có xác thực */
routes.post('/updateinformation', verifyToken, authenticationController.updateInformation);
routes.post('/updatepassword', verifyToken, authenticationController.change_password);

module.exports = routes;