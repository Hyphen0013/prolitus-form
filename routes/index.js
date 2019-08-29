module.exports = {
    homePage: (req, res) => {
        let username = req.body.username;
        let query = "SELECT * FROM `users` ORDER BY id ASC";
        
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }

            res.render('layouts/welcome.ejs', {
                title: 'Home page',
                username: username
            })
        })
    }
}



// const express = require('express');
// const router = express.Router();


// module.exports = router;

// router.get('/', (req, res) => {
//     res.render('layouts/welcome.ejs');
// });