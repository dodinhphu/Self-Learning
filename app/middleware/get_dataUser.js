const jwt = require("jsonwebtoken");
const user = require("../model/user");
get_user = (req, res, next) => {
    // lấy ra token trên cookies
    const token = req.cookies.token;
    // nếu token tồn tại thì kt , không thì gán biến kt bằng false
    if (!token) {
        res.locals.kt = false;
        return next();
    }
    else {
        jwt.verify(token.trim(), process.env.APP_SECRET, (err, data) => {
            if (err) {
                res.locals.kt = false;
                return next();
            }
            else {
                user.findOne({ email: data })
                    .then(function (data) {
                        res.locals.kt = true;
                        res.locals.quyen = data.type;
                        res.locals.fullname = data.fullname;
                        next();
                    })
                    .catch(function (err) {
                        res.locals.kt = false;
                    })
            }
        })
    }

}
module.exports = get_user;