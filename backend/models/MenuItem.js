const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  category: { type: String, required: true }, // e.g., 'bites', 'bowls', 'desserts'
  name: { type: String, required: true },
  price: { type: String, required: true },
  numPrice: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  calories: { type: String },
  desc: { type: String },
  image: { type: String },
  active: { type: Boolean, default: true },
  hasVariations: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', menuItemSchema);
