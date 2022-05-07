const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const { engine } = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
const cookieParser = require('cookie-parser')
const db = require('./config/db/db');
const cors = require('cors');
const bodyParser = require('body-parser')
const route = require('./routes/index_route');
/* helpers */
/*  */
db.connectDB();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(cookieParser())
/* template  */
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: "main",
    helpers: {
        section: hbs_sections(),
        check_quyen: (quyen, so) => {
            if (quyen == so) return true;
            else return false
        },
        check_gia: (gia) => {
            if (Number(gia) == 0) return true;
            else return false
        },
        acti: (lessonhientai, lesson) => {
            return lessonhientai.toString().trim() == lesson.toString().trim()
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));
/* socket.io */
var server = require("http").Server(app)
/* port */
const PORT = process.env.APP_PORT || 5000;
server.listen(PORT, () => {
    console.log('server listen port ', PORT);
});
/* socket */
const io = require("socket.io")(server);
app.set("io", io)


route(app);


module.exports = { app: app };