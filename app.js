const fileUpload = require('express-fileupload');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const keys = require('./config/keys');

const {homePage} = require('./routes/index');
const {registerPage, addRegister, loginPage, userLogin, userLogout} = require('./routes/users');


const app = express();

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'prolitus_form'
});
db.connect((err) => {
    if(err) throw err;
    else console.log('Connected to Database...');
});
global.db = db;


// Configure middleware
app.use(express.static('./public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(fileUpload());


// routes the app
// app.use('/', require('./routes/index'));
// app.use('/users', require('./routes/users'));
app.get('/', homePage);
app.get('/users/register', registerPage);
app.get('/users/login', loginPage);
app.get('/users/login', loginPage);
app.get('/users/logout', userLogout);

app.post('/users/register', addRegister);
app.post('/users/login', userLogin);



app.listen(keys.PORT, (err) => {
    console.log(`Server running on PORT: ${keys.PORT}`);
});
