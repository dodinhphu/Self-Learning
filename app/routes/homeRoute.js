const express = require('express');
const routes = express.Router();
const homeController = require('../controllers/homeController')
 

routes.get('/home',homeController.show_home);

routes.get('/',homeController.show_default);


module.exports = routes;