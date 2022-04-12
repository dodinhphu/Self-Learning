const express = require('express');
const routes = express.Router();
const teacherController = require('../controllers/teacherController');
const upload = require('../util/multer');
routes.get('/createcourse', teacherController.show);


routes.post('/createcourse', upload.single('myfile'), teacherController.create_course);

module.exports = routes;