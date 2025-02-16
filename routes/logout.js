const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.clearCookie('token');  // Clear the JWT token cookie
    return res.redirect('/login');  // Redirect to login page
});

module.exports = router;
