const User = require("../model/user");
const FeedBack = require("../model/feedback");
const { redirect } = require("express/lib/response");
class feedbackController {
    async show(req, res, next) {
        try {
            let user = await User.findOne({
                email: req.data.email
            })
            if (user) {
                res.render("viewFeedback/show_feedback", {
                    data: user.toObject()
                })
            }
            else {
                res.render("viewFeedback/show_feedback")
            }
        } catch (err) {
           redirect("/authentication/login")
        }

    }


    // post
    async create(req, res, next) {
        try {
            FeedBack.create(req.body)
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
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        }
    }
}
module.exports = new feedbackController();