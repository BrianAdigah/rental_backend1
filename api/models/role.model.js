const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., Admin, Clerk
});

exports.Role = mongoose.model('Role', roleSchema);