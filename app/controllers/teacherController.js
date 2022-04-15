const Course = require("../model/course");
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
                const new_course = {
                    course_id: uuidv4(),
                    course_name: req.body.course_name,
                    course_price: Number(req.body.course_price),
                    course_description: req.body.course_description,
                    course_img: file.filename,
                    course_status: true,
                    course_author: req.data.email
                }
                let course = await Course.create(new_course);
                if (course) {
                    return res.status(200).json({
                        data: course,
                        message: 'Create a successful course'
                    });
                }
                else {
                    return res.status(500).json({
                        message: 'Course Creation Failed'
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
                    let img_cu = course.course_img;
                    course.course_name = req.body.course_name;
                    course.course_price = req.body.course_price;
                    course.course_description = req.body.course_description;
                    course.course_img = file.filename;
                    course.save()
                        .then(function (data) {
                            // xóa ảnh củ
                            fs.unlinkSync(`${Root_path}\\app\\src\\public\\upload\\${img_cu}`);
                            return res.status(200).json({
                                message: 'Success Course Update',
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
                        message: 'Course not found'
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
    async delete_course(req, res, nexr) {
        try {
            // xóa ảnh cũ
            fs.unlinkSync(`/upload/${req.body.course_img}`);
            // xóa khóa học trong db
            let course = await Course.deleteOne({ course_id: req.body.course_id });
            if (course) {
                return res.status(200).json({
                    message: 'Delete Success Course',
                    data: course
                })
            }
            else {
                return res.status(500).json({
                    message: 'Delete Failed Course'
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