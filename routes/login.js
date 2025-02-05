const express = require('express');
const router = express.Router();
const User = require('../models/createuser');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }


        res.render('home_page');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
