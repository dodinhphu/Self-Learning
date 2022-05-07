const { redirect } = require("express/lib/response");
const Course = require("../model/course");
const User = require("../model/user");
/* socket.io */
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
    async lerningLesson(req, res, next) {
        /*  req.app.settings.io.on("connection", function (socket) {
             console.log("có người kêt nối")
         }) */
        try {
            let course = await Course.findOne({
                course_id: req.params.course_id,
            })
            let lesson = await course.course_lesson.id(req.params.lesson_id)
            if (course && lesson) {
                return res.render("viewDetailsLesson/detailsLesson", {
                    all_lesson: course.toObject().course_lesson,
                    lesson: lesson.toObject(),
                    course_id: course.course_id
                })
            }
            else {
                return res.render("default")
            }
        } catch (err) {
            return res.render("default")
        }
    }
    async show_exercise(req, res, next) {
        res.render("student/view_exercise")
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


    async out_course(req, res, next) {
        try {
            let course = await Course.findOne({
                course_id: req.params.id
            })
            if (course) {
                let new_arr_member = await course.course_member.filter(function (m) {
                    return m != req.data.email
                })
                course.course_member = new_arr_member;
                course.save()
                    .then(function (data) {
                        return res.status(200).json({
                            course_id: data.course_id
                        })
                    })
                    .catch(function (err) {
                        return res.status(500).json({
                            message: err.message
                        })
                    })
            }
            else {
                return res.status(500).json({
                    message: "Không Tìm Thấy Khóa Học"
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