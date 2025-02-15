const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware,async (req, res) => {
  try {
    const profile = await Profile.findOne(); // Database se ek profile fetch karein

    res.render('profile', { profile, user: req.user }); // Profile data ko frontend par bhejna
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching profile data");      
  }
});

router.post('/', async (req, res) => {
  try {
    const { businessName, ownerName, gst, address, phone, email, idDocument, idType } = req.body;
    const profileCreated = await Profile.create({
      businessName,
      ownerName,
      gst,
      address,
      phone,
      email,
      idDocument,
      idType,
    });

    res.send("Profile created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;