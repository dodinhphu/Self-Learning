const express = require('express');
const routes = express.Router();
const homeController = require('../controllers/homeController')
const verifyToken = require("../middleware/verifyToken");

routes.get('/home',verifyToken,homeController.show_home);

routes.get('/',homeController.show_default);


module.exports = routes;