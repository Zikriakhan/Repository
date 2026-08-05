const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  primaryColor: { type: String, required: true },
  secondaryColor: { type: String, required: true },
  active: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Theme', themeSchema);
