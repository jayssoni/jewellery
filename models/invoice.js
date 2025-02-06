const mongoose = require('mongoose');

const invoice = new mongoose.Schema({
    invoiceNumber : Number,
    invoiceDate : String,
    customerName : String, 
    customerAddress : String,
    customerMobile : Number,
    total: Number
})

const invoiceData = mongoose.model('invoice' , invoice);
module.exports = invoiceData;