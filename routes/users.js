const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('layouts/registration');
});




module.exports = router;








