const jwt = require("jsonwebtoken");
check_noLogin = (req, res, next) => {
    const authorization = req.cookies.token;
    if (!authorization) {
        next();
    }
    else {
        const token = authorization.trim();
        jwt.verify(token, process.env.APP_SECRET, (err, token) => {
            if (err) {
                next();
            }
            else {
                return res.redirect("/");
            }
        });
    }
}
module.exports = check_noLogin;
