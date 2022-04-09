const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
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
    // post login
    async login(req, res, next) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.json({
                    status: false,
                    message: "Account does not exist"
                })
            }
            else {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    //đăng nhập thành công
                    //tạo token key
                    const token = jwt.sign(user.email, process.env.APP_SECRET);
                    // trả về trang home
                    if (req.query.prevlink) {
                        return res.json({
                            token_key: token,
                            status: true,
                            prevlink: process.env.LINK_WEB + req.query.prevlink
                        })
                    }
                    else {
                        return res.json({
                            token_key: token,
                            status: true
                        })
                    }
                }
                else {
                    //đăng nhập thất bại
                    return res.json({
                        status: false,
                        message: "Incorrect password"
                    })
                }
            }
        } catch (err) {
            return res.json({
                status: false,
                message: "Login unsuccessful"
            })
        }
    }

}
module.exports = new authenticationController();