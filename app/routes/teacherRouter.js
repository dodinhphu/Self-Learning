const express = require('express');
const routes = express.Router();
const teacherController = require('../controllers/teacherController');
const upload = require('../util/multer');
routes.get('/createcourse', teacherController.show_regiter);
routes.get('/:id/updatecourse', teacherController.show_update);


routes.post('/createcourse', upload.single('myfile'), teacherController.create_course);
routes.post('/updatecourse', upload.single('myfile'), teacherController.update_course);
routes.post('/deletecourse', upload.single('myfile'), teacherController.delete_course);

module.exports = routes;