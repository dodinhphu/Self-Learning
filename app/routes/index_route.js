const homeRoute = require('./homeRoute');
const authenticationRoute = require('./authenticationRoute');
const teacherRoute = require("./teacherRouter")
const studentRoute = require("./studentRoute")
const courseRoute = require("./courseRoute")
const feedbackRoute = require("./feedbackRoute")
const adminRoute = require("./adminRoute")
const verifyToken = require("../middleware/verifyToken");
const check_teacher = require("../middleware/verifyToken_checkTeacher");
const check_student = require("../middleware/check_student");
const check_admin = require("../middleware/check_admin");
const get_user = require('../middleware/get_dataUser')
function route(app) {
    app.use(get_user);
    app.use('/admin', check_admin, adminRoute);
    app.use('/feedback', verifyToken, feedbackRoute);
    app.use('/course', verifyToken, courseRoute);
    app.use('/student', check_student, studentRoute);
    app.use('/teacher', check_teacher, teacherRoute);
    app.use('/authentication', authenticationRoute);
    app.use('/', homeRoute);

}
module.exports = route