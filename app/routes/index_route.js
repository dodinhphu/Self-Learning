const homeRoute = require('./homeRoute');
const authenticationRoute = require('./authenticationRoute');
const teacherRoute = require("./teacherRouter")
const studentRoute = require("./studentRoute")
const courseRoute = require("./courseRoute")
const verifyToken = require("../middleware/verifyToken");
const check_teacher = require("../middleware/verifyToken_checkTeacher");
const check_student = require("../middleware/check_student");
const get_user = require('../middleware/get_dataUser')
function route(app) {
    app.use(get_user);
    app.use('/course', verifyToken, courseRoute);
    app.use('/student', check_student, studentRoute);
    app.use('/teacher', check_teacher, teacherRoute);
    app.use('/authentication', authenticationRoute);
    app.use('/', homeRoute);

}
module.exports = route