const Course = require("../model/course");
const User = require("../model/user");
const fs = require('fs');
var Root_path = require('app-root-path');
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
const user = require("../model/user");
const { redirect } = require("express/lib/response");
class teacherController {
    show_regiter(req, res, next) {
        return res.render('viewTeacher/registerCourse', {
            btn_name: "Creater",
            id_btn: 'btn_creater'
        });
    }
    // get update course
    async show_update(req, res, next) {
        let course = await Course.findOne({
            course_id: req.params.id
        });
        if (course) {
            return res.render('viewTeacher/updateCourse', {
                data: course.toObject(),
                btn_name: "Changer",
                id_btn: 'btn_update'
            });
        }
        else {
            res.redirect('/')
        }


    }

    // get show my class
    async show_myClass(req, res, next) {
        let list_courses = await Course.find({
            course_author: req.data.email
        })
        if (list_courses.length > 0) {
            let new_list_course = list_courses.map(function (course) {
                return course.toObject();
            })
            let list = [];
            for (let i = 0; i < new_list_course.length; i++) {
                let user = await User.findOne({ email: new_list_course[i].course_author })
                new_list_course[i].name = user.fullname;
                list.push(new_list_course[i])
            }
            return res.render('viewTeacher/myCourse', {
                data: list
            });
        }
        else {
            return res.render("viewTeacher/myCourse")
        }
    }
    // get show dtails class
    async details_Class(req, res, next) {
        let course = await Course.findOne({
            course_id: req.params.id
        })
        if (course) {
            course = course.toObject();
            let new_arr = []
            for (let i = 0; i < course.course_member.length; i++) {
                let user = await User.findOne({
                    email: course.course_member[i]
                })
                new_arr.push({
                    email: course.course_member[i],
                    name: user.fullname
                })
            }
            course.new_arr_member = new_arr
            course.course_lesson.sort(function (a, b) {
                return a.lesson_STT - b.lesson_STT
            });
            return res.render('viewTeacher/classDetails', {
                data: course
            })
        }
        else {
            return res.render('404/404')
        }
    }

    // get create lesson
    async show_create_lesson(req, res, next) {
        return res.render("viewTeacher/createLesson", {
            btn_name: "Tạo",
            id_btn: "btn_create",
            title: "Creater Lesson",
            id: req.params.id
        })
    }
    // get update lesson
    async show_update_lesson(req, res, next) {
        let course = await Course.findOne({
            course_id: req.params.id,
        })
        let lesson = await course.course_lesson.id(req.params.stt)
        return res.render("viewTeacher/updateLesson", {
            btn_name: "Sửa",
            id_btn: "btn_update",
            title: "Update Lesson",
            id: req.params.id,
            data: lesson.toObject()
        })
    }
    /* bt*/
    async show_create_exercise(req, res, next) {
        try {
            return res.render("viewTeacher/create_exercise")
        } catch (err) {
            return res.render("404/404")
        }
    }
    async show_update_exercise(req, res, next) {
        try {
            let course = await Course.findOne({
                course_id: req.params.course_id
            })
            let lesson = await course.course_lesson.id(req.params.lesson_id)
            let exercise = await lesson.lesson_exercises.id(req.params.exercise_id)
            return res.render("viewTeacher/update_exercise", {
                data: exercise.toObject()
            })
        } catch (err) {
            res.render("404/404")
        }
    }
    async update_exercise(req, res, next) {
        try {
            let course = await Course.findOne({
                course_id: req.params.course_id
            })
            course.course_lesson.id(req.params.lesson_id).lesson_exercises.id(req.params.exercise_id).input = req.body.input;
            course.course_lesson.id(req.params.lesson_id).lesson_exercises.id(req.params.exercise_id).output = req.body.output;
            course.save()
                .then(function (data) {
                    return res.status(200).json({
                        data: data
                    })
                })
                .catch(function (err) {
                    return res.status(500).json({
                        message: err.message,
                        err: err
                    })
                })
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
    async delete_exercise(req, res, next) {
        try {
            let course = await Course.findOne({
                course_id: req.params.course_id
            })
            course.course_lesson.id(req.params.lesson_id).lesson_exercises.id(req.params.exercise_id).remove()
            course.save()
                .then(function (data) {
                    return res.status(200).json({
                        data: data
                    })
                })
                .catch(function (err) {
                    return res.status(500).json({
                        message: err.message,
                        err: err
                    })
                })
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
    /* thêm bài tập post */
    async create_exercise(req, res, next) {
        try {
            Course.findOne({
                course_id: req.params.course_id
            })
                .then(function (data) {
                    data.course_lesson.id(req.params.lesson_id).lesson_exercises.push(req.body)
                    data.save()
                        .then(function (data) {
                            return res.status(200).json({
                                data: data
                            })
                        })
                        .catch(function (err) {
                            return res.status(500).json({
                                message: err.message
                            })
                        })
                })
                .catch(function (err) {
                    return res.status(500).json({
                        message: err.message
                    })
                })
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }

    /* post create course */
    async create_course(req, res, next) {
        try {
            const file = req.file;
            if (!file) {
                return res.status(500).json({
                    message: 'Please upload a file'
                })
            }
            else {
                let arr = req.body.course_result.split("\r\n");
                let new_arr = arr.filter(item => item.length > 0)
                const new_course = {
                    course_id: uuidv4(),
                    course_name: req.body.course_name,
                    course_price: Number(req.body.course_price),
                    course_description: req.body.course_description,
                    course_result: new_arr,
                    course_img: file.filename,
                    course_status: true,
                    course_author: req.data.email
                }
                let course = await Course.create(new_course);
                if (course) {
                    return res.status(200).json({
                        data: course,
                        message: 'Tạo Mới KHóa Học Thành Công'
                    });
                }
                else {
                    return res.status(500).json({
                        message: 'Tạo Mới Khóa Học Thất Bại'
                    })
                }
            }

        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }

    /* post update course */
    async update_course(req, res, next) {
        try {
            // thêm ảnh mới
            const file = req.file;
            if (!file) {
                return res.status(500).json({
                    message: 'Update Failed Course'
                })
            }
            else {
                let course = await Course.findOne({
                    course_id: req.body.course_id,
                })
                if (course) {
                    let arr = req.body.course_result.split("\r\n");
                    let new_arr = arr.filter(item => item.length > 0)
                    console.log(new_arr)
                    let img_cu = course.course_img;
                    course.course_name = req.body.course_name;
                    course.course_price = req.body.course_price;
                    course.course_description = req.body.course_description;
                    course.course_result = new_arr;
                    course.course_img = file.filename;

                    course.save()
                        .then(function (data) {
                            // xóa ảnh củ
                            fs.unlinkSync(`${Root_path}\\app\\src\\public\\upload\\${img_cu}`);
                            return res.status(200).json({
                                message: 'Cập Nhật Khóa Học Thành Công',
                                data: data
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
                        message: 'Không Tìm Thấy Khóa Học'
                    })
                }
            }
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }

    /* post delete Course */
    async delete_course(req, res, next) {
        try {
            // xóa ảnh cũ
            fs.unlinkSync(`/upload/${req.body.course_img}`);
            // xóa khóa học trong db
            let course = await Course.deleteOne({ course_id: req.body.course_id });
            if (course) {
                return res.status(200).json({
                    message: 'Xóa Khóa Học Thành Công',
                    data: course
                })
            }
            else {
                return res.status(500).json({
                    message: 'Xóa Khóa Học Thất Bại'
                })
            }
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }

    /* post create lesson */
    async create_lesson(req, res, next) {
        try {
            let new_lesson = {
                lesson_name: req.body.lesson_name,
                lesson_video: req.body.lesson_video,
                lesson_STT: Number(req.body.lesson_STT),
            }
            Course.updateOne({
                course_id: req.params.id,
                'course_lesson.lesson_STT': { $ne: new_lesson.lesson_STT }
            }, {
                $push: { course_lesson: new_lesson }
            })
                .then(function (course) {
                    if (course.modifiedCount > 0) {
                        return res.status(200).json({
                            message: "Tạo Bài Học Thành Công",
                            course_lesson: course
                        })
                    }
                    else {
                        return res.status(500).json({
                            message: "Tạo Bài Học Không Thành Công",
                            course_lesson: course
                        })
                    }
                })
                .catch(function (err) {
                    return res.status(500).json({
                        message: err.message
                    })
                })
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }

    }
    /* post update lesson */
    async update_lesson(req, res, next) {
        try {
            let a = await Course.updateOne({
                course_id: req.params.id,
                "course_lesson._id": { $eq: req.params.stt }
            }, {
                $set: {
                    "course_lesson.$.lesson_STT": req.body.lesson_STT,
                    "course_lesson.$.lesson_name": req.body.lesson_name,
                    "course_lesson.$.lesson_video": req.body.lesson_video,
                }
            })
            if (a.modifiedCount == 0) {
                return res.status(500).json({
                    message: "Cập Nhật Bài Học Không Thành Công"
                })
            }
            else {
                return res.status(200).json({
                    message: "Cập Nhật Bài Học Thành Công"
                })
            }
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
    /* post delete lesson */
    async delete_lesson(req, res, next) {
        try {
            let course = await Course.findOne({
                course_id: req.params.id
            })
            if (course) {
                course.course_lesson.id(req.params.lesson_id).remove();
                course.save()
                    .then(function (data) {
                        return res.status(200).json({
                            message: `Xóa Thành Công bài học `,
                            id: req.params.lesson_id
                        })
                    })
                    .catch(function (err) {
                        return res.status(500).json({
                            message: err.message
                        })
                    })
            }
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }

    /* post delete member */
    async delete_member(req, res, next) {
        try {
            let course = await Course.findOne({
                course_id: req.params.id
            })
            if (course) {
                let new_arr_member = await course.course_member.filter(function (m) {
                    return m != req.body.member
                })
                course.course_member = new_arr_member;
                course.save()
                    .then(function (data) {
                        return res.status(200).json({
                            email: req.body.member
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
module.exports = new teacherController();