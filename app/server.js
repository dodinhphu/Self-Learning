const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const { engine } = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
const db = require('./config/db/db');

db.connectDB();
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public')));

/* template  */
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: "main",
    helpers: {
        section: hbs_sections(),
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));

const route = require('./routes/index_route');class homeController {
    // http://facebookfinder/home
    show(req, res, next) {
        return res.render('home');
    }
}
module.exports = new homeController();
route(app);
const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
    console.log('server listen port ', PORT);
});