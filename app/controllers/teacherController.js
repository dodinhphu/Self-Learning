const Course = require("../model/course");
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
class teacherController {
    show(req, res, next) {
        return res.render('viewTeacher/registerCourse');
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
                console.log(new_course)
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
}
module.exports = new teacherController();