const homeRoute = require('./homeRoute');
const authentication = require('./authenticationRoute');

function route(app) {
    app.use('/authentication', authentication);
    app.use('/home', homeRoute);
    app.use('/', homeRoute);
    app.all('*', (req, res, next) => {
        const err = new Error('Không Tồn Tại Trang !!!');
        err.status = 404;
        next(err);
    })
}
module.exports = route