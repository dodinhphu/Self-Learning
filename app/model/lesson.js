const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const course = new Schema({
    course_id: {
        type: String,
        trim: true,
        required: [true, 'You have not entered your course'],
    },
    lesson_number: {
        type: Number,
        unique: [true, 'Lesson number Already Exists '],
        required: [true, 'You have not entered your Lesson number']
    },
    course_video: {
        type: String,
        unique: [true, 'Course video Already Exists '],
        required: [true, 'You have not entered your Course video']
    },
    dateCreater: {
        type: String,
        default: new Date().toDateString()
    }
});

module.exports = mongoose.model('course', course);