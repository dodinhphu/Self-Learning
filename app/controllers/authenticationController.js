const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const mailer = require("../util/sendMail")
const { create } = require("../model/user");
const { redirect } = require("express/lib/response");
class authenticationController {
    // get login
    show_login(req, res, next) {
        return res.render('login');
    }
    // get register
    show_register(req, res, next) {
        return res.render('register');
    }
    // get forgot Password
    show_forgotPassword(req, res, next) {
        jwt.verify(req.query.token, process.env.APP_SECRET, (err, token) => {
            if (err) {
                return res.render('forgotPassword', {
                    kt_hang: false
                })
            }
            else {
                return res.render('forgotPassword', {
                    kt_hang: true
                })
            }
        })
    }
    // get show_update
    async show_update(req, res, next) {
        jwt.verify(req.cookies.token, process.env.APP_SECRET, async (err, token) => {
            if (err) {
                return res.redirect("/authentication/login")
            }
            else {
                let data = await User.findOne({
                    email: token
                })
                if (data) {
                    data = data.toObject();
                    return res.render('updateInformation', { data });
                }
                else {
                    return res.redirect("/authentication/login")
                }

            }
        })

    }
    // get change password
    show_changePassword(req, res, next) {
        return res.render('updatePassword')
    }
    logout(req, res, next) {
        res.clearCookie('token');
        return  res.redirect('/authentication/login')
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
    // post reset password
    async resetPassword(req, res, next) {
        try {
            const user = await User.findOne({
                email: req.body.email
            })
            if (user) {
                // tìm thấy người  dùng
                //tạo một token key
                const token = jwt.sign({ email: user.email }, process.env.APP_SECRET, { expiresIn: '180s' });
                // gửi token key cho người dùng
                let tieudemail = 'Forgot password';
                let noidungmail = `
                <h3> Click This Link To Change Password.</h3>
                <a href='${process.env.LINK_WEB}/authentication/forgotpassword?token=${token}'>Change Password</a>
                `;
                mailer.sendMail(user.email.toString(), tieudemail, noidungmail)
                    .then(function (mail) {
                        res.status(200).json(mail)
                    })
                    .catch(function (err) {
                        console.log('aaaa', err);
                        res.status(500).json({
                            message: "Email sending failed"
                        })
                    })

            }
            else {
                res.status(500).json({
                    message: "User not found"
                })
            }
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    }

    // post change forgotpassword
    async changePassword(req, res, next) {
        try {
            let token = req.body.token.replace('?token=', '');
            jwt.verify(token, process.env.APP_SECRET, (err, token) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Token has expired'
                    })
                }
                else {
                    User.findOne({
                        email: token.email,
                    })
                        .then(function (user) {
                            user.password = req.body.password;
                            user.save()
                                .then(function (data) {
                                    return res.status(200).json(data);
                                })
                                .catch(function (err) {
                                    return res.status(500).json(err);
                                })
                        })
                        .catch(function (err) {
                            return res.status(500).json({
                                message: 'Account Not Found'
                            });
                        })
                }
            })
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }

    }

    // post updateInformation
    async updateInformation(req, res, next) {
        jwt.verify(req.cookies.token, process.env.APP_SECRET, async (err, token) => {
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            }
            else {
                let user = await User.findOne({
                    email: token
                })
                if (user) {
                    user.fullname = req.body.fullname;
                    user.address = req.body.address;
                    user.numberPhone = req.body.numberPhone
                    user.save()
                        .then(function (data) {
                            res.status(200).json(data);
                        })
                        .catch(function (err) {
                            res.status(500).json({
                                message: err.message
                            })
                        })
                }
            }
        })
    }
    //post change_password
    async change_password(req, res, next) {
        jwt.verify(req.cookies.token, process.env.APP_SECRET, async (err, token) => {
            if (err) {
                return res.status(500).json({
                    message: err.message
                })
            }
            else {
                let user = await User.findOne({
                    email: token
                })
                if (user) {
                    user.password = req.body.password;
                    user.save()
                        .then(function (data) {
                            return res.status(200).json(data);
                        })
                        .catch(function (err) {
                            return res.status(500).json({
                                message: err.message
                            })
                        })
                }
                else {
                    return res.status(500).json({
                        message: 'User not found'
                    })
                }
            }
        })
    }
}

module.exports = new authenticationController();