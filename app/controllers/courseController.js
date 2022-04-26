const { render } = require("express/lib/response");
const Course = require("../model/course");
const User = require("../model/user");
class courseController {
    async show_details(req, res, next) {
        let course = await Course.findOne({
            course_id: req.params.id
        })
        let kt_member = course.course_member.includes(req.data.email)
        if (course) {
            return res.render('viewCourse/details_course', {
                data: course.toObject(),
                kt_member: kt_member
            })
        }
        else {
            return res.render('/home')
        }
    }
}
module.exports = new courseController();