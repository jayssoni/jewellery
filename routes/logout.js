const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.clearCookie('token');  
    req.flash('success_msg', 'You have logged out successfully');
    return res.redirect('/login');  
});

module.exports = router;
