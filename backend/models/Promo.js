const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // 'Hero', 'BrowniePromo', 'FriedMacCheesePromo', 'FreshlyPrepared', 'PizzaPromo'
  title: { type: String },
  subtitle: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  price: { type: Number },
  buttonText: { type: String },
  buttonLink: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Promo', promoSchema);
