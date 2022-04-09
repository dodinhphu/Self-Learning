class authenticationController {
    // get login
    show_login(req, res, next) {
        return res.render('login');
    }
    // get register
    show_register(req, res, next) {
        return res.render('register');
    }
}
module.exports = new authenticationController();