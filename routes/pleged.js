const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Third page route
router.get('/',authMiddleware, (req, res) => {
  res.render('pleged', { user: req.user }); // Render the third.ejs template
});

module.exports = router;