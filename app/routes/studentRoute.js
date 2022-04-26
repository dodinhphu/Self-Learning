const express = require('express');
const routes = express.Router();
const studentController = require('../controllers/studentController');

routes.get('/mycourse', studentController.show_myCourse);

routes.post('/:id/joinlesson/', studentController.join_class);


module.exports = routes;