const path = require('path');
var Root_path = require('app-root-path');
const multer = require('multer');
const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, Root_path + '/app/src/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
})

var upload = multer({ storage: storage, fileFilter: imageFilter });
module.exports = upload;