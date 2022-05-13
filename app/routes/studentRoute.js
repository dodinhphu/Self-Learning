const express = require('express');
const routes = express.Router();
const studentController = require('../controllers/studentController');

routes.get('/mycourse', studentController.show_myCourse);
routes.get('/:course_id/lerninglesson/:lesson_id', studentController.lerningLesson);
routes.get('/exercise/:course_id/:lesson_id/:exercise_id', studentController.show_exercise);

routes.post('/:id/joinlesson/', studentController.join_class);
routes.delete('/:id/outcourse/', studentController.out_course);

module.exports = routes;