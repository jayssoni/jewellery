const express = require('express');
const router = express.Router();

// Third page route
router.get('/', (req, res) => {
  res.render('pleged'); // Render the third.ejs template
});

module.exports = router;