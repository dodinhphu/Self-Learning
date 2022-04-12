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
                console.log(user)
                if (user && user.type == 1) {
                    let data = {
                        email: user.email,
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
