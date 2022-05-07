const Course = require("../model/course");
const User = require("../model/user");
class homeController {
    async show_home(req, res, next) {
        let list_courses = await Course.find({});
        if (list_courses.length>0) {
            let list = [];
            for (let i = 0; i < list_courses.length; i++) {
                list_courses[i] = list_courses[i].toObject();
                let user = await User.findOne({ email: list_courses[i].course_author })
                list_courses[i].name = user.fullname;
                list.push(list_courses[i])
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