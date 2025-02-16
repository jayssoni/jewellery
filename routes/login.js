const express = require('express');
const router = express.Router();
const User = require('../models/createuser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // JWT library
const Profile = require('../models/profile'); // Import the Profile model

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

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expiry time
        });

        // Set token in cookie
        res.cookie('token', token, { httpOnly: true });

        // Fetch profile data associated with the logged-in user
        const profile = await Profile.findOne({ user: user._id });

        // Redirect to home page with profile data
        res.render('home_page', { profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;