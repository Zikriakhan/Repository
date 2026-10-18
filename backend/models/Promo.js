const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // 'Hero', 'BrowniePromo', 'FriedMacCheesePromo', 'FreshlyPrepared', 'PizzaPromo'
  title: { type: String },
  subtitle: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  videoUrl: { type: String },
  playlist: [
    {
      id: { type: mongoose.Schema.Types.Mixed },
      label: { type: String },
      name: { type: String },
      src: { type: String }
    }
  ],
  price: { type: Number },
  buttonText: { type: String },
  buttonLink: { type: String }
}, { timestamps: true, strict: false });

module.exports = mongoose.model('Promo', promoSchema);
