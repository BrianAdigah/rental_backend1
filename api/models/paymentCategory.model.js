const mongoose = require('mongoose');

const paymentCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., Rent, Maintenance
  description: String
});

exports.PaymentCategory = mongoose.model('PaymentCategory', paymentCategorySchema);


