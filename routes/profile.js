const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, async (req, res) => {
  try {
    // Fetch profile data associated with the logged-in user  
    const profile = await Profile.findOne({ user: req.user.id }); 

    res.render('profile', { profile, user: req.user }); // Profile data ko frontend par bhejna  
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching profile data");      
  }
});

router.post('/',authMiddleware, async (req, res) => {
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
      user: req.user.id, // Associate the profile with the logged-in user
    });

    res.send("Profile created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;