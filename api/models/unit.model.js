const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  unitNumber: { type: String, required: true },
  floor: String,
  propertyName: String,
  rentAmount: { type: Number, required: true },
  isOccupied: { type: Boolean, default: false }
});

exports.Unit = mongoose.model('Unit', unitSchema);