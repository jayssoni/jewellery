const express = require('express');
const router = express.Router();
const invoiceData = require('../models/invoice');
const Profile = require('../models/profile'); // Import the Profile model
const authMiddleware = require('../middleware/authMiddleware');

// GET: Fetch all invoices
router.get('/', authMiddleware, async (req, res) => {
    try {
        // Fetch all invoices and populate user and profile details
        const invoices = await invoiceData.find()
            .populate('user', 'name email')
            .populate('profile', 'businessName ownerName gst address phone email');

        // Fetch the profile data
        const profile = await Profile.findOne();

        // Render the Billing view with invoices, profile, and user data
        res.render('Billing', { invoices, profile, user: req.user });
    } catch (error) {
        console.error("Error fetching invoices:", error);
        res.status(500).json({ error: "Server error while fetching invoices." });
    }
});

// POST: Create a new invoice
router.post('/', authMiddleware, async (req, res) => {
    try {
        console.log("Received data:", req.body); // Debugging step

        // Destructure and validate required fields
        const { invoiceNumber, invoiceDate, customerName, customerAddress, customerMobile, total, amountPaid, user, profile, items } = req.body;

        if (!invoiceNumber || !invoiceDate || !customerName || !customerAddress || !customerMobile || !total) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        // Convert to numbers and validate
        const parsedInvoiceNumber = Number(invoiceNumber);
        const parsedTotal = Number(total);
        const parsedAmountPaid = Number(amountPaid) || 0;

        if (isNaN(parsedInvoiceNumber) || isNaN(parsedTotal) || isNaN(parsedAmountPaid)) {
            return res.status(400).json({ error: "Invalid invoiceNumber, total, or amountPaid." });
        }

        // Calculate outstanding amount and payment status
        const outstandingAmount = parsedTotal - parsedAmountPaid;
        const paymentStatus = outstandingAmount <= 0 ? "Paid" : "Pending";

        // Create the invoice
        const newInvoice = await invoiceData.create({
            invoiceNumber: parsedInvoiceNumber,
            invoiceDate,
            customerName,
            customerAddress,
            customerMobile,
            total: parsedTotal,
            amountPaid: parsedAmountPaid,
            outstandingAmount,
            paymentStatus,
            items, // Include items if provided
            user, // Include user if available
            profile // Include profile if available
        });

        console.log("Invoice created successfully:", newInvoice);
        res.status(201).json({ message: "Invoice created", invoice: newInvoice });

    } catch (error) {
        console.error("Error creating invoice:", error);
        res.status(500).json({ error: error.message || "Server error while creating invoice." });
    }
});

// PUT: Update an invoice (e.g., when a payment is made)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const { amountPaid } = req.body;

        // Validate amountPaid
        if (typeof amountPaid !== 'number' || isNaN(amountPaid)) {
            return res.status(400).json({ error: "Invalid amountPaid." });
        }

        // Find the invoice
        const invoice = await invoiceData.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({ error: "Invoice not found." });
        }

        // Update amount paid and recalculate outstanding amount and payment status
        invoice.amountPaid = Number(amountPaid) || 0;
        invoice.outstandingAmount = invoice.total - invoice.amountPaid;
        invoice.paymentStatus = invoice.outstandingAmount <= 0 ? "Paid" : "Pending";

        // Save the updated invoice
        await invoice.save();
        res.status(200).json({ message: "Invoice updated successfully", invoice });

    } catch (error) {
        console.error("Error updating invoice:", error);
        res.status(500).json({ error: error.message || "Server error while updating invoice." });
    }
});

module.exports = router;