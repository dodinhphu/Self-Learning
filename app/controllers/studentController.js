const Course = require("../model/course");
const User = require("../model/user");
class studentController {

    async show_myCourse(req, res, next) {
        let list_course = await Course.find({
            course_member: req.data.email
        })
        let data = list_course.map(function (course) {
            return course.toObject();
        })
        return res.render("student/view_mycourse", {
            data: data
        })
    }


    async join_class(req, res, next) {
        try {
            let kt = await Course.updateOne({
                course_id: req.params.id,
            }, {
                $addToSet: { course_member: req.data.email }
            })
            if (kt.modifiedCount == 0) {
                return res.status(500).json({
                    message: "Đăng Ký Thành Viên Không Thành Công"
                })
            }
            else {
                return res.status(200).json({
                    message: "Đăng Ký Thành Viên Thành Công"
                })
            }
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }

}
module.exports = new studentController();