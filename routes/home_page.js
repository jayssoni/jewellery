const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware

// Use authMiddleware to protect this route
router.get('/', authMiddleware, (req, res) => {
    res.render('home_page', { user: req.user });
});

module.exports = router;