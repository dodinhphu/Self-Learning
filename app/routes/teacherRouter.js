const express = require('express');
const routes = express.Router();
const teacherController = require('../controllers/teacherController');
 
routes.get('/',teacherController.show);

module.exports = routes;