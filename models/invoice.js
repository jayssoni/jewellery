const mongoose = require("mongoose");
const User = require("./createuser");
const profile = require("./profile");

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: Number, required: true, unique: true },
    invoiceDate: { type: Date, required: true },
    customerName: { type: String, required: true, trim: true },
    customerAddress: { type: String, required: true },
    customerMobile: { type: String, required: true },
    total: { type: Number, required: true, min: 0 },
    amountPaid: { type: Number, default: 0 },
    outstandingAmount: { type: Number, default: 0 },
    paymentStatus: { type: String, default: "Pending" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
    items: [
      {
        description: { type: String, required: true },
        pcs: { type: Number, required: true },
        purity: { type: String, required: true },
        weight: { type: Number, required: true },
        rate: { type: Number, required: true },
        amount: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const invoiceData = mongoose.model("Invoice", invoiceSchema);
module.exports = invoiceData;
