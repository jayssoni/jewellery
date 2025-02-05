const express = require('express');
const router = express.Router();

// Second page route
router.get('/', (req, res) => {
  res.render('Billing'); // Render the second.ejs template
});

module.exports = router;