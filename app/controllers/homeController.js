const Course = require("../model/course");
const User = require("../model/user");
class homeController {
    async show_home(req, res, next) {
        let list_courses = await Course.find({});
        if (list_courses.length>0) {
            let new_list_course = list_courses.map(function (course) {
                return course.toObject();
            })
            let list = [];
            for (let i = 0; i < new_list_course.length; i++) {
                let user = await User.findOne({ email: new_list_course[i].course_author })
                new_list_course[i].name = user.fullname;
                list.push(new_list_course[i])
            }
            return res.render('home', {
                data: list
            });
        }
        else {
            return res.render('home')
        }

    }

    show_default(req, res, next) {
        return res.render('default');
    }
}
module.exports = new homeController();