class homeController {
    show(req, res, next) {
        return res.render('home');
    }
}
module.exports = new homeController();