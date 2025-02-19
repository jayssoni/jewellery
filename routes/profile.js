const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    res.render('profile', { profile, user: req.user, messages: req.flash() });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching profile data");
  }
});


router.post('/', authMiddleware, async (req, res) => {
  try {
    const { businessName, ownerName, gst, address, phone, email, idDocument, idType } = req.body;
    await Profile.create({
      businessName,
      ownerName,
      gst,
      address,
      phone,
      email,
      idDocument,
      idType,
      user: req.user.id,
    });

    req.flash('success', 'Profile created successfully');
    res.redirect('/profile'); // Redirect to profile page to display the flash message
  } catch (error) {
    console.error(error);
    req.flash('error', 'Error creating profile');
    res.redirect('/profile');
  }
});


module.exports = router;