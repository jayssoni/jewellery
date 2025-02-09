const mongoose = require('mongoose');

const invoice = new mongoose.Schema({
    invoiceNumber : Number,
    invoiceDate : String,
    customerName : String, 
    customerAddress : String,
    customerMobile : Number,
    total: Number,

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

    profile : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Profile'
    }
}, {timestamps : true});

const invoiceData = mongoose.model('invoice' , invoice);
module.exports = invoiceData;