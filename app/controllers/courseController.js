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
            course.course_lesson.sort(function (a, b) {
                return a.lesson_STT - b.lesson_STT
            }); 
            return res.render('viewCourse/details_course', {
                data: course.toObject(),
                kt_member: kt_member
            })
        }
        else {
            return res.render('404/404')
        }
    }
}
module.exports = new courseController();