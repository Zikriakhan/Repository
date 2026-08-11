const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
  variationId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariation' },
  name: { type: String, required: true },
  variationName: { type: String },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number },
  lineTotal: { type: Number },
  image: { type: String }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  status: { type: String, default: 'Received' },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
