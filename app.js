const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const keys = require('./config/keys');

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

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(fileUpload());


// routes the app
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));



app.listen(keys.PORT, (err) => {
    console.log(`Server running on PORT: ${keys.PORT}`);
});
