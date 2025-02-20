const express = require("express");
const router = express.Router();
const invoiceData = require("../models/invoice");
const Profile = require("../models/profile"); // Import the Profile model
const authMiddleware = require("../middleware/authMiddleware");

// GET: Fetch all invoices
router.get("/", authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).send("Unauthorized: User not found.");
    }

    const invoices = await invoiceData
      .find()
      .populate("user", "name email")
      .populate("profile", "businessName ownerName gst address phone email");

    const userProfile = await Profile.findOne({ user: req.user._id });

    res.render("Billing", {
      invoices,
      profile: userProfile || null,
      user: req.user,
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).send("Server error while fetching invoices.");
  }
});

// POST: Create a new invoice
router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log("Received data:", req.body); // Debugging step

    let {
      invoiceNumber,
      invoiceDate,
      customerName,
      customerAddress,
      customerMobile,
      total,
      amountPaid,
      items,
    } = req.body;

    // Convert to numbers
    invoiceNumber = Number(invoiceNumber);
    total = Number(total);
    amountPaid = Number(amountPaid) || 0; // Default to 0 if not provided

    // Validate inputs
    if (isNaN(invoiceNumber) || isNaN(total) || isNaN(amountPaid)) {
      return res
        .status(400)
        .json({ error: "Invalid invoiceNumber, total, or amountPaid" });
    }

    // Fetch the profile associated with the user
    const userProfile = await Profile.findOne({ user: req.user._id });
    if (!userProfile) {
      return res.status(400).json({ error: "User profile not found" });
    }

    // Calculate outstanding amount and payment status
    const outstandingAmount = total - amountPaid;
    const paymentStatus = outstandingAmount <= 0 ? "Paid" : "Pending";
    const safeItems = Array.isArray(items) ? items : [];
    // Create the invoice
    const newInvoice = await invoiceData.create({
      invoiceNumber,
      invoiceDate,
      customerName,
      customerAddress,
      customerMobile,
      total,
      amountPaid,
      outstandingAmount,
      paymentStatus,
      user: req.user._id,
      profile: userProfile._id,
      items: safeItems, // Use validated array
 // Include items
    });

    console.log("Invoice created successfully:", newInvoice);
    res.status(201).json({ redirect: "/Billing" });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res
      .status(500)
      .json({ error: error.message || "Server error while creating invoice." });
  }
});

module.exports = router;
