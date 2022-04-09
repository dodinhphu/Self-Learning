const User = require("../model/user");
const bcrypt = require('bcryptjs');
const { create } = require("../model/user");
class authenticationController {
    // get login
    show_login(req, res, next) {
        return res.render('login');
    }
    // get register
    show_register(req, res, next) {
        return res.render('register');
    }

    // post register
    async register(req, res, next) {
        try {
            const user = {
                email: req.body.email.toLowerCase(),
                password: req.body.password,
                numberPhone: req.body.numberPhone,
                fullname: req.body.fullname,
                address: req.body.address,
                type: Number.parseInt(req.body.type)
            }
            const new_user = await User.create(user);
            return res.json({
                status: true,
                message: "Sign up successfully"
            })
        } catch (error) {
            if (error.code == 11000) {
                error.message = `Email: ${error.keyValue.email} already exists`
            }
            return res.json({
                status: false,
                message: error.message
            })
        }
    }

}
module.exports = new authenticationController();