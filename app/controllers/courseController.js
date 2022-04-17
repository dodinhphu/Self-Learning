const { render } = require("express/lib/response");
const Course = require("../model/course");
const User = require("../model/user");
class courseController {
    async show_details(req, res, next) {
        let course = await Course.findOne({
            course_id: req.params.id
        })
        if (course) {
            return res.render('viewCourse/details_course', {
                data: course.toObject()
            })
        }
        else {
            return res.render('viewCourse/details_course')
        }
    }
}
module.exports = new courseController();