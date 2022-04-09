class teacherController {
    show(req, res, next) {
        return res.render('teacher');
    }
}
module.exports = new teacherController();