const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  name: { type: String, default: () => 'Theme-' + Date.now() },
  primary: { type: String, required: true },
  accent: { type: String, required: true },
  light: { type: String, required: true },
  active: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Theme', themeSchema);
