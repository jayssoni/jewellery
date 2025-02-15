const express = require('express');
const router = express.Router();
const User = require('../models/createuser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // JWT library
const { body, validationResult } = require('express-validator');

router.get('/', (req, res) => {
  res.render('signup'); // Render signup page
});

router.post(
  '/',
  [
    body('fullname')
      .trim()
      .isLength({ min: 3 })
      .withMessage('Full name must be at least 3 characters long'),

    body('email')
      .trim()
      .isEmail()
      .withMessage('Invalid email format'),

    body('password')
      .trim()
      .isLength({ min: 4 })
      .withMessage('Password must be at least 4 characters long'),

    body('confirmpass')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match');
        }
        return true;
      }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { fullname, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await User.create({
        name: fullname,
        email,
        password: hashedPassword,
      });

      // Generate JWT for the new user
      const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      // Set token in cookie
      res.cookie('token', token, { httpOnly: true });

      res.send("User Created Successfully");
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;