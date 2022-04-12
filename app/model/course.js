const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
const course = new Schema({
    course_id: {
        type: String,
        unique: [true, 'Course Already Exists '],
        trim: true,
        required: [true, 'You have not entered your id course'],
        default: uuidv4()
    },
    course_name: {
        type: String,
        required: [true, 'You have not entered your course name']
    },
    course_author: {
        type: String,
        trim: true,
        required: [true, 'You have not entered your author']
    },
    course_price: {
        type: Number,
        default: 0,
        required: [true, 'You have not entered your course price']
    },
    course_description: {
        type: String,
        required: [true, 'You have not entered your course description']
    },
    course_img: {
        type: String,
        unique: [true, 'Images Already Exists '],
        required: [true, 'You have not entered your course image']
    },
    course_member: {
        type: Array,
        default: []
    },
    course_lesson: {
        type: [
            {
                lesson_name: {
                    type: String,
                    required: [true, 'You have not entered your lesson name']
                },
                lesson_video: {
                    type: String,
                    required: [true, 'You have not entered your lesson video']
                },
                dateCreater: {
                    type: String,
                    default: new Date().toDateString()
                }
            }
        ],
        default: [],
    },
    course_status: {
        type: Boolean,
        default: true
    },
    dateCreater: {
        type: String,
        default: new Date().toDateString()
    }
});

module.exports = mongoose.model('course', course);