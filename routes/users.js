// const express = require('express');
// const router = express.Router();
const fs = require('fs');
var mysql = require('mysql');
const session = require('express-session');


module.exports = {
    registerPage: (req, res) => {
        res.render('layouts/registration.ejs', {
            message: 'Register here',
            title: 'Register Page'
        });
    },

    addRegister: (req, res) => {
        console.log(req.body)
        console.log(req.files)

        if (!req.files) {
            return res.status(400).send('No files were uploaded.');
        }


        // var usersSave = {
        //     'name' : req.body.name,
        //     'username' : req.body.username,
        //     'email' : req.body.email,
        //     'password' : req.body.password,
        //     'hobbies' : req.body.hobbies,
        //     'gender' : req.body.gender,
        //     'dob' : req.body.dob,
        //     'address1' : req.body.address1,
        //     'address2' : req.body.address2,
        //     'city' : req.body.city,
        //     'country' : req.body.country,
        //     'zip' : req.body.zip,
        //     'textareawrite' : req.body.textareawrite,
        //     'image' : req.files.avtar,
        //     'created' : req.body.created,
        //     'modified' : req.body.modified
        // }

        let message = '';
        let name = req.body.name;
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;
        let hobbies = req.body.hobbies;
        let gender = req.body.gender;
        let dob = req.body.dob;
        let address1 = req.body.address1;
        let address2 = req.body.address2;
        let city = req.body.city;
        let country = req.body.country;
        let zip = req.body.zip;
        let textareawrite = req.body.textareawrite;
        let uploadedFile = req.files.avtar;

        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = username + '.' + fileExtension;


        let usernameQuery = "SELECT * FROM users WHERE username = '" + username + "' ";

        db.query(usernameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.length > 0) {
                message = 'Username and email already exists';
                res.render('layouts/registration.ejs', {
                    title: 'Register here',
                    message
                });
            } else {
                // check the filetype before uploading it
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    // upload the file to the /puplic/assets/img dirctory
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err) => {
                        if (err) {
                            return res.status(500).send(err);
                        }

                        // send the player's details to the databse
                        // let query = "INSERT INTO users (name, username, email, password, hobbies, gender, dob, address1, address2, city, country, zip, textareawrite, avtar, created, modified) VALUES ('" + users +"') "
                        // let insertQuery  = mysql.format('INSERT INTO users SET ?');
                        let insertQuery = "INSERT INTO `users` (name, username, email, password, hobbies, gender, dob, address1, address2, city, country, zip, textareawrite, avtar) VALUES ('" + name + "', '" + username + "', '" + email + "', '" + password + "', '" + hobbies + "', '" + gender + "', '" + dob + "', '" + address1 + "', '" + address2 + "', '" + city + "', '" + country + "', '" + zip + "', '" + textareawrite + "', '" + image_name + "')";

                        console.log("Data:  " + insertQuery)
                        db.query(insertQuery, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }
                            res.redirect('/');
                        });
                    });
                } else {
                    message = `Invalid File format. Only 'gif', 'jpeg', 'png' images are allowed.`;
                    res.render('layouts/registration.ejs', {
                        title: 'Register here',
                        message
                    });
                }
            }
        });
    },

    loginPage: (req, res) => {
        res.render('layouts/login.ejs', {
            title: 'Login'
        });
    },

    userLogin: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let username = req.body.username;

        db.query("SELECT * FROM users WHERE username = ?", [username], (err, result, fields) => {

            if (err) {
                return res.status(400).send(err);
            } else {
                if (result.length > 0) {
                    if(result[0].password == password) {
                        res.render('layouts/welcome.ejs', {
                            title: 'Welcome',
                            message: 'Login sucessfull',
                            username: username
                        })
                    } else {
                        res.status(204).send({ message: 'Email and password not match' });
                    }
                } else {
                    res.status(204).send({ message: 'Email does not exists'});
                } 
            }
        });
    },

    userLogout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                res.redirect('/');
            }
        });
    }

  
}



/*
router.get('/register', (req, res) => {
    res.render('layouts/registration');
});

router.get('/login', (req, res) => {
    res.render('layouts/login');
});



module.exports = router; */








