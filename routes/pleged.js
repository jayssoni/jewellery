const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Invoice = require('../models/invoice');

// Invoice history page route
router.get('/', authMiddleware, async (req, res) => {
    try {
        const invoices = await Invoice.find({ user: req.user._id }).populate("user");
        res.render('pleged', { user: req.user, invoices });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
