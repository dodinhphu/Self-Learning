const express = require('express');
const routes = express.Router();
const feedbackController = require('../controllers/feedbackController')

routes.get('/',feedbackController.show);

routes.post('/',feedbackController.create)
module.exports = routes;