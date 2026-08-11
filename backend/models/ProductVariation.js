const mongoose = require('mongoose');

const productVariationSchema = new mongoose.Schema({
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  name: { type: String, required: true },
  price: { type: String, required: true }, // e.g. "AED8.99"
  numPrice: { type: Number, required: true }, // e.g. 8.99
  compareAtPrice: { type: Number },
  sku: { type: String },
  active: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('ProductVariation', productVariationSchema);
