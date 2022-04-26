const express = require('express');
const routes = express.Router();
const teacherController = require('../controllers/teacherController');

const upload = require('../util/multer');
routes.get('/createcourse', teacherController.show_regiter);
routes.get('/:id/updatecourse', teacherController.show_update);
routes.get('/myclass', teacherController.show_myClass);
routes.get('/:id/detailsclass', teacherController.details_Class);
routes.get('/:id/createlesson', teacherController.show_create_lesson);
routes.get('/:id/updatelesson/:stt', teacherController.show_update_lesson);

routes.post('/createcourse', upload.single('myfile'), teacherController.create_course);
routes.post('/updatecourse', upload.single('myfile'), teacherController.update_course);
routes.post('/deletecourse', upload.single('myfile'), teacherController.delete_course);
routes.post('/:id/createlesson', upload.single('myfile'), teacherController.create_lesson);
routes.post('/:id/updatelesson/:stt', teacherController.update_lesson);
routes.post('/:id/deletelesson/:lesson_id', teacherController.delete_lesson);

module.exports = routes;