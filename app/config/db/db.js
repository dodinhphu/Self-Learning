const mongoose = require('mongoose');

const connectDB = async () => {
    
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connect DB Thành Công !');
    }
    catch (error) {
        console.log("err",error);
        process.exit(1);
    }
}
module.exports = { connectDB }