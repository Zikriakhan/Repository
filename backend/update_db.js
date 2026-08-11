const mongoose = require('mongoose');
require('dotenv').config();

const menuItemSchema = new mongoose.Schema(
  {
    category: { type: String },
    name: { type: String },
    price: { type: String },
    numPrice: { type: Number },
    rating: { type: Number },
    calories: { type: String },
    desc: { type: String },
    image: { type: String },
    active: { type: Boolean },
  },
  { timestamps: true }
);

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

async function run() {
  try {
    // No useNewUrlParser or useUnifiedTopology needed
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDB.');

    const items = await MenuItem.find({});
    let updatedCount = 0;

    for (const item of items) {
      if (item.price && item.price.includes('$')) {
        const newPrice = item.price.replace('$', 'AED ');

        item.price = newPrice;

        await item.save();

        updatedCount++;
      }
    }

    console.log(`Successfully updated ${updatedCount} items.`);
  } catch (err) {
    console.error('Error updating items:', err);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
  }
}

run();