const homeRoute = require('./homeRoute');
const authenticationRoute = require('./authenticationRoute');
const teacherRoute = require("./teacherRouter")
const courseRoute = require("./courseRoute")
const verifyToken = require("../middleware/verifyToken");
const check_teacher = require("../middleware/verifyToken_checkTeacher");
const get_user = require('../middleware/get_dataUser')
function route(app) {
    app.use(get_user);
    app.use('/course', verifyToken, courseRoute);
    app.use('/teacher', check_teacher, teacherRoute);
    app.use('/authentication', authenticationRoute);
    app.use('/', homeRoute);
  
}
module.exports = route