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
        unique: [true, 'Email Already Exists '],
        validate: [validateEmail, 'Please fill in a valid email address'],
        trim: true,
        required: [true, 'You have not entered your email']
    },
    password: {
        type: String,
        trim: true,
        minLength: [6, 'Password Must Be Over 6 Characters'],
        required: [true, 'You have not entered your password']
    },
    numberPhone: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /((09|03|07|08|05)+([0-9]{8})\b)/g.test(v)
            },
            message: props => `${props.value} is not a valid phone number`
        },
        minLength: [10, 'Number phone Must Be Over 10 Characters'],
        maxlength: [11, 'Phone number must be less than 11 characters'],
        required: [true, 'You have not entered your Number Phone']
    },
    fullname: {
        type: String,
        trim: true,
        required: [true, 'You have not entered your full name']
    },
    address: {
        type: String,
        trim: true,
        required: [true, 'You have not entered your address']
    },
    type: {
        type: Number,
        min: [0, 'Exceed the value'],
        max: [2, 'Exceed the value'],
        trim: true,
        required: [true, 'You have not entered your  account type']
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