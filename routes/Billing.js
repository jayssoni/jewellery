const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const invoiceData = require('../models/invoice');
const Profile = require('../models/profile');

router.get('/', async (req, res) => {
    try {
        const invoices = await invoiceData.find().populate('user', 'name email').populate('profile', 'businessName');
        res.render('Billing', { invoices }); 
    } catch (error) {
        console.error("Error fetching invoices:", error);
        res.status(500).send("Server error while fetching invoices.");
    }
});

router.post('/', async (req, res) => {
    try {
        const { invoiceNumber, invoiceDate, customerName, customerAddress, customerMobile, total } = req.body;
        
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        const profile = await Profile.findOne({ user: req.user._id });
        if (!profile) {
            return res.status(400).json({ error: "User profile not found" });
        }

        const newInvoice = await invoiceData.create({
            invoiceNumber,
            invoiceDate,
            customerName,
            customerAddress,
            customerMobile,
            total,
            user: req.user._id,  
            profile: profile._id 
        });

        console.log("Invoice created successfully.");
        res.status(201).json({ message: "Invoice created", invoice: newInvoice });
    } catch (error) {
        console.error("Error creating invoice:", error);
        res.status(500).json({ error: "Server error while creating invoice." });
    }
});

module.exports = router;
