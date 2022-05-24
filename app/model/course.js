const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
let lesson_exercises = new Schema({
    question: {
        type: String,
        required: [true, 'Bạn Phải nhập đề bài']
    },
    input: {
        type: String,
    },
    output: {
        type: String,
        required: [true, 'Bạn phải nhập Kết Quả Mong Muốn']
    },
    document: {
        type: String,
        required: [true, 'Hãy Nhập Gợi Ý Cho Bài Tập Này']
    }
})

let lesson = new mongoose.Schema({
    lesson_STT: {
        type: String,
        unique: [true, 'Số Thứ Tự Bài Học Đã Tồn Tại'],
        required: [true, 'Bạn Cần Nhập Số Thứ Tự Cho Bài Học'],
        trim: true
    },
    lesson_name: {
        type: String,
        required: [true, 'Bạn Cần Nhập Tên Cho Bài Học']
    },
    lesson_video: {
        type: String,
        required: [true, 'Bạn Cần Thêm Video Cho Bài Học Này']
    },
    lesson_exercises: [lesson_exercises],
    dateCreater: {
        type: String,
        default: new Date().toDateString()
    }
});

const course = new Schema({
    course_id: {
        type: String,
        unique: [true, 'Khóa Học Đã Tồn Tại'],
        trim: true,
        required: [true, 'Bạn Cần Nhập ID Của Khóa Học'],
        default: uuidv4()
    },
    course_name: {
        type: String,
        required: [true, 'Bạn Cần Nhập Tên Của Khóa Học']
    },
    course_author: {
        type: String,
        trim: true,
        required: [true, 'Khóa Học Chưa Có Tác Giả']
    },
    course_price: {
        type: Number,
        default: 0,
        required: [true, 'Bạn Cần Nhập Giá Của Khóa Học']
    },
    course_description: {
        type: String,
        required: [true, 'Hãy Mô Tả Khóa Học Này']
    },
    course_result: {
        type: Array,
        required: [true, 'Kết Quả Khóa Học Của Bạn']
    },
    course_img: {
        type: String,
        unique: [true, 'Ảnh Đã Bị Trùng Tên'],
        required: [true, 'Bạn Cần Chọn Ảnh Cho Khóa Học']
    },
    course_member: {
        type: Array,
        default: []
    },
    course_lesson: {
        type: [lesson],
        default: []
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