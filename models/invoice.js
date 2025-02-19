const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: Number, required: true, unique: true },
  invoiceDate: { type: Date, required: true },
  customerName: { type: String, required: true },
  customerAddress: { type: String, required: true },
  customerMobile: { type: String, required: true },
  total: { type: Number, required: true },
  amountPaid: { type: Number, default: 0 },
  outstandingAmount: { type: Number, default: 0 },
  paymentStatus: { type: String, default: 'Pending' },
  items: [
    {
      description: String,
      pcs: Number,
      purity: String,
      weight: Number,
      rate: Number,
      amount: Number,
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);