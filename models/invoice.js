const mongoose = require('mongoose');
const User = require('./createuser');
const profile = require('./profile');

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: { type: Number, required: true, unique: true },
    invoiceDate: { type: Date, required: true },
    customerName: { type: String, required: true, trim: true },
    customerAddress: { type: String, required: true },
    customerMobile: { type: String, required: true },
    total: { type: Number, required: true, min: 0 },
    amountPaid: { type: Number, default: 0 }, // New field
    outstandingAmount: { type: Number, default: 0 }, // New field
    paymentStatus: { type: String, default: "Pending" }, // New field
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Made optional
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' } // Made optional
}, { timestamps: true });

const invoiceData = mongoose.model('Invoice', invoiceSchema);
module.exports = invoiceData;