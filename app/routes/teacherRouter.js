const express = require('express');
const routes = express.Router();
const teacherController = require('../controllers/teacherController');
const verifyToken = require("../middleware/verifyToken");
 
routes.get('/',verifyToken,teacherController.show);

module.exports = routes;