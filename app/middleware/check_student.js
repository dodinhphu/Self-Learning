const jwt = require("jsonwebtoken");
const User = require('../model/user');
verifyToken = async (req, res, next) => {
    const authorization = req.cookies.token;
    if (!authorization) {
        res.clearCookie('token');
        return res.redirect(`/authentication/login?prevlink=${req.originalUrl}`);
    }
    else {
        const token = authorization.trim();
        jwt.verify(token, process.env.APP_SECRET, async (err, token) => {
            if (err) {
                res.clearCookie('token');
                return res.redirect(`/authentication/login?prevlink=${req.originalUrl}`);
            }
            else {
                let user = await User.findOne({
                    email: token
                })
                if (user && user.type == 2) {
                    let data = {
                        email: user.email,
                        name: user.fullname
                    }
                    req.data = data;
                    next();
                }
                else {
                    res.clearCookie('token');
                    return res.redirect(`/authentication/login?prevlink=${req.originalUrl}`);
                }
            }
        });
    }
}
module.exports = verifyToken;
