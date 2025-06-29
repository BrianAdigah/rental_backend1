const mongoose = require('mongoose');

const paymentTypeSchema = new mongoose.Schema({
  name: { type: String, enum: ['cash', 'card', 'bank_transfer', 'mobile_money'], required: true }
});

exports.PaymentType = mongoose.model('PaymentType', paymentTypeSchema);
