const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// GET all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.aggregate([
      {
        $lookup: {
          from: 'productvariations', // collection name in mongodb is typically lowercase plural
          localField: '_id',
          foreignField: 'menuItem',
          as: 'variations'
        }
      },
      {
        $addFields: {
          id: '$_id',
          variationCount: { $size: '$variations' },
          minVariationPrice: { $min: '$variations.numPrice' }
        }
      },
      {
        $project: {
          variations: 0 // exclude the array of variations to save bandwidth
        }
      }
    ]);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new menu item
router.post('/', async (req, res) => {
  const item = new MenuItem(req.body);
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a menu item
router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ message: 'Menu item not found' });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a menu item
router.delete('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Menu item not found' });
    
    // Also delete any associated variations
    const ProductVariation = require('../models/ProductVariation');
    await ProductVariation.deleteMany({ menuItem: req.params.id });
    
    res.json({ message: 'Menu item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
