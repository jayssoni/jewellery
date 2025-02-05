const express = require('express');
const router = express.Router();
const Profile = require('../models/profile');


router.get('/', (req, res) => {
  res.render('profile'); // Render the profile.ejs template
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