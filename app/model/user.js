const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const Schema = mongoose.Schema;

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const user = new Schema({
    email: {
        type: String, 
        unique: [true, 'Email Đã Tồn Tại '],
        validate: [validateEmail, 'Email Sai Định Dạng'],
        trim: true,
        required: [true, 'Bạn Cần Nhập Email']
    },
    password: {
        type: String,
        trim: true,
        minLength: [6, 'Mật Khẩu Phải Trên 6 Ký Tự'],
        required: [true, 'Bạn Phải Nhập Mật Khẩu']
    },
    numberPhone: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /((09|03|07|08|05)+([0-9]{8})\b)/g.test(v)
            },
            message: props => `${props.value} Sai Định Dạng`
        },
        minLength: [10, 'Số Điện Thoại Sai Định Dạng'],
        maxlength: [10, 'Số Điện Thoại Sai Định Dạng'],
        required: [true, 'Bạn Phải Nhập Số Điện Thoại !']
    },
    fullname: {
        type: String,
        trim: true,
        required: [true, 'Bạn Phải Nhập Họ Và Tên']
    },
    address: {
        type: String,
        trim: true,
        required: [true, 'Bạn Phải Nhập Địa Chỉ']
    },
    type: {
        type: Number,
        min: [0, 'Loại Tài Khoản Không Hợp Lệ'],
        max: [2, 'Loại Tài Khoản Không Hợp Lệ'],
        trim: true,
        required: [true, 'Bạn Phải Chọn Loại Tài Khoản']
    },
    notifications: {
        type: Array,
        trim: true,
        default: []
    },
    dateCreater: {
        type: String,
        default: new Date().toDateString()
    }
});
user.pre('save', function (next) {
    let user = this;
    bcryptjs.hash(user.password, 10, function (err, data) {
        if (err) return next(err);
        else {
            user.password = data;
            next();
        }
    })
})

module.exports = mongoose.model('user', user);