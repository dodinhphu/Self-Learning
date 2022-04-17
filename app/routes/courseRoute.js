const express = require('express');
const routes = express.Router();
const courseController = require('../controllers/courseController')
 

routes.get('/:id/details',courseController.show_details);


module.exports = routes;