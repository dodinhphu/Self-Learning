const { redirect } = require("express/lib/response");
const Course = require("../model/course");
const User = require("../model/user");
let list_online = [];
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
        try {
            let course = await Course.findOne({
                course_id: req.params.course_id,
            })
            let lesson = await course.course_lesson.id(req.params.lesson_id)
            /* socket io */
            let io = req.app.get('socketio');

            io.once("connection", function (socket) {
                console.log(req.data.name + " đã online")

                socket.p_name = req.data.name;
                socket.p_email = req.data.email;
                let aa = {
                    email: req.data.email,
                    name: req.data.name
                }
                let new_arr = list_online.filter(function (item) {
                    return item.email === aa.email && item.name === aa.name
                })
                if (new_arr.length == 0) {
                    list_online.push(aa);
                }
                let ma = "mang-online" + course.course_id.toString();
                io.sockets.emit(ma, list_online);


                socket.on(lesson._id, function (data) {
                    let rp = {
                        data: data,
                        name: req.data.name
                    }
                    socket.emit(`server_codon${lesson._id}`, data)
                    socket.broadcast.emit(`server_${lesson._id}`, rp)
                })

                /* out */
                socket.on("disconnect", function () {
                    for (var i = 0; i < list_online.length; i++) {
                        if (list_online[i].email == socket.p_email && list_online[i].name == socket.p_name) {
                            list_online.splice(i, 1);
                        }
                    }
                    io.sockets.emit(ma, list_online);
                })
            })

            if (course && lesson) {
                course.course_lesson.sort(function (a, b) {
                    return a.lesson_STT - b.lesson_STT
                });
                return res.render("viewDetailsLesson/detailsLesson", {
                    all_lesson: course.toObject().course_lesson,
                    lesson: lesson.toObject(),
                    course_id: course.course_id
                })
            }
            else {
                return res.render("404/404")
            }
        } catch (err) {
            return res.render("404/404")
        }
    }
    async show_exercise(req, res, next) {
        try {
            let course = await Course.findOne({
                course_id: req.params.course_id
            })
            if (course) {
                let bt = course.course_lesson.id(req.params.lesson_id).lesson_exercises.id(req.params.exercise_id);
                if (bt) {
                    return res.render("student/view_exercise", {
                        data: bt.toObject(),
                        course_id: req.params.course_id,
                        lesson_id: req.params.lesson_id
                    })
                }
                else {
                    return res.render("404/404")
                }
            }
            else {
                return res.render("404/404")
            }
        } catch (err) {
            return res.render("404/404")
        }
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
                    message: "Đăng Ký Thành Viên Không Thành Công",
                })
            }
            else {
                let course = await Course.findOne({
                    course_id: req.params.id
                })
                return res.status(200).json({
                    message: "Đăng Ký Thành Viên Thành Công",
                    course_id: course.course_id,
                    lesson_id: course.course_lesson[0]._id
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