const Course = require("../model/course");
const User = require("../model/user");
const fs = require('fs');
var Root_path = require('app-root-path');
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
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
    // get show my class
    async details_Class(req, res, next) {
        let course = await Course.findOne({
            course_id: req.params.id
        })
        if (course) {
            return res.render('viewTeacher/classDetails', {
                data: course.toObject()
            })
        }
        else {
            return res.render('viewTeacher/classDetails')
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
}
module.exports = new teacherController();