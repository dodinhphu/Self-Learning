const homeRoute = require('./homeRoute');
const authenticationRoute = require('./authenticationRoute');
const teacherRoute = require("./teacherRouter")
const get_user = require('../middleware/get_dataUser')
function route(app) {
    app.use(get_user);
    app.use('/teacher', teacherRoute);
    app.use('/authentication', authenticationRoute);
    app.use('/home', homeRoute);
    app.use('/', homeRoute);
    app.all('*', (req, res, next) => {
        const err = new Error('Không Tồn Tại Trang !!!');
        err.status = 404;
        next(err);
    })
}
module.exports = route