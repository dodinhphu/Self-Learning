const User = require("../model/user");
const Course = require("../model/course");
const Feedback = require("../model/feedback")
const mailer = require("../util/sendMail")
class adminController {
    async show_all_course(req, res, next) {
        try {
            let course = await Course.find({
            })
            for (let i = 0; i < course.length; i++) {
                course[i] = course[i].toObject()
                let user = await User.findOne({
                    email: course[i].course_author
                })
                course[i].tacgia = user.fullname
            }
            if (course) {
                res.render("viewAdmin/view_all_course", {
                    data: course
                })
            }
            else {
                res.render("viewAdmin/view_all_course")
            }
        } catch (err) {
            res.render("viewAdmin/view_all_course")
        }

    }
    async show_all_user(req, res, next) {
        let list_user = await User.find({})
        let list_teacher = [];
        let list_student = [];
        for (let i = 0; i < list_user.length; i++) {
            list_user[i] = list_user[i].toObject()
            if (list_user[i].type == 1) {
                list_teacher.push(list_user[i])
            }
            else if (list_user[i].type == 2) {
                list_student.push(list_user[i])
            }
        }
        return res.render("viewAdmin/view_users", {
            list_teacher: list_teacher,
            list_student: list_student
        })
    }
    async show_all_feedback(req, res, next) {
        try {
            let list_feedback = await Feedback.find({})
            if (list_feedback.length > 0) {
                for (let i = 0; i < list_feedback.length; i++) {
                    list_feedback[i] = list_feedback[i].toObject();
                }
                return res.render("viewAdmin/view_all_feedback", {
                    data: list_feedback
                })
            }
            else {
                return res.render("viewAdmin/view_all_feedback")
            }

        } catch (err) {
            return res.render("viewAdmin/view_all_feedback")
        }
    }




    async seach_name_course(req, res, next) {
        try {
            let list_course = await Course.find({
                "course_name": { '$regex': req.body.seach }
            })
            for (let i = 0; i < list_course.length; i++) {
                list_course[i] = list_course[i].toObject()
                let user = await User.findOne({
                    email: list_course[i].course_author
                })
                list_course[i].tacgia = user.fullname
            }
            return res.status(200).json({
                data: list_course
            })
        } catch (err) {
            return res.status(500).json({
                mesage: err.mesage
            })
        }
    }

    async delete_user(req, res, next) {
        try {
            let user = await User.findOne({
                email: req.body.email
            })
            User.deleteOne({
                email: req.body.email
            })
                .then(async function (data) {
                    if (user.type == 2) {
                        let list_course = await Course.find({
                            course_member: req.body.email
                        })
                        for (let i = 0; i < list_course.length; i++) {
                            let new_arr_member = await list_course[i].course_member.filter(function (m) {
                                return m != req.body.email
                            })
                            list_course[i].course_member = new_arr_member
                            let kt = await list_course[i].save()
                        }
                        return res.status(200).json({
                            data: data
                        })
                    }
                    else if (user.type == 1) {
                        let list_course = await Course.deleteMany({
                            course_author: req.body.email
                        })
                        if (list_course.deletedCount > 0)
                            return res.status(200).json({
                                data: data
                            })
                    }

                })
                .catch(function (err) {
                    return res.status(500).json({
                        mesage: err.mesage
                    })
                })
        } catch (err) {
            return res.status(500).json({
                mesage: err.mesage
            })
        }
    }

    async delete_feedback(req, res, next) {
        try {
            Feedback.deleteOne({
                _id: req.body._id
            })
                .then(function (data) {
                    return res.status(200).json({
                        data: data,
                        id: req.body._id
                    })
                })
                .catch(function (err) {
                    return res.status(500).json({
                        mesage: err.mesage
                    })
                })
        } catch (err) {
            return res.status(500).json({
                mesage: err.mesage
            })
        }
    }

    async phanhoi_feedback(req, res, next) {
        try {
            Feedback.findOne({
                _id: req.body._id
            })
                .then(function (data) {
                    let tieudemail = 'Phản Hồi Feedback';
                    let noidungmail = `
                    <h3>Xin Chào, ${data.fullname}</h3>
                    <br/>
                    <p style="font-size:16px">${req.body.noidung}</p>
                    <br/>
                    <h3>Trân TRọng !</h3>
                    `;

                    mailer.sendMail(data.email, tieudemail, noidungmail)
                        .then(async function (mail) {
                            data.status = true;
                            await data.save()
                            res.status(200).json(mail)
                        })
                        .catch(function (err) {
                            res.status(500).json({
                                message: "Gửi Mail Không Thành Công"
                            })
                        })
                })
                .catch(function (err) {
                    return res.status(500).json({
                        mesage: err.mesage
                    })
                })
        } catch (err) {
            return res.status(500).json({
                mesage: err.mesage
            })
        }
    }
}
module.exports = new adminController();