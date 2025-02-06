const express = require('express');
const router = express.Router();
const mongoose =require('mongoose');
const invoiceData = require('../models/invoice')

// Second page route
router.get('/', (req, res) => {
  res.render('Billing'); 
});

router.post('/', async (req,res) => {
  const {invoiceNumber,invoiceDate,customerName,customerAddress,customerMobile,total} = req.body;
  const invoiceCreate = await invoiceData.create({
    invoiceNumber,
    invoiceDate,
    customerName,
    customerAddress,
    customerMobile,
    total
  });
  console.log("invoice created")
  res.send('invoice created');
})

module.exports = router;
