const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const classRegister = new Schema({
    course_id: {
        type: String,
        trim: true,
        required: [true, 'You have not entered your  course']
    },
    student: {
        type: String,
        trim: true,
        required: [true, 'You have not entered your student']
    },
    status: {
        type: Boolean,
        default: false,
    },
    dateCreater: {
        type: String,
        default: new Date().toDateString()
    }
});

module.exports = mongoose.model('classRegister', classRegister);