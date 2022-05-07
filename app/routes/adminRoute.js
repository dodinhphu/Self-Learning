const express = require('express');
const routes = express.Router();
const adminController = require('../controllers/adminController')

routes.get('/allcourse', adminController.show_all_course);
routes.get('/alluser', adminController.show_all_user);
routes.get('/allfeedback', adminController.show_all_feedback);



routes.post('/seache_course', adminController.seach_name_course);
routes.delete('/deleteuser', adminController.delete_user);
routes.delete('/deletefeedback', adminController.delete_feedback);
routes.post('/phanhoi_feedback', adminController.phanhoi_feedback);
module.exports = routes;