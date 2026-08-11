const express = require('express');
const router = express.Router();
const ProductVariation = require('../models/ProductVariation');
const MenuItem = require('../models/MenuItem');

// GET all variations for a menu item
router.get('/menu/:menuId', async (req, res) => {
  try {
    const variations = await ProductVariation.find({ menuItem: req.params.menuId }).sort({ sortOrder: 1 });
    res.json(variations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new variation
router.post('/', async (req, res) => {
  try {
    const variation = new ProductVariation(req.body);
    const newVariation = await variation.save();
    
    // Automatically set hasVariations to true on the parent menu item
    await MenuItem.findByIdAndUpdate(req.body.menuItem, { hasVariations: true });
    
    res.status(201).json(newVariation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a variation
router.put('/:id', async (req, res) => {
  try {
    const updatedVariation = await ProductVariation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVariation) return res.status(404).json({ message: 'Variation not found' });
    res.json(updatedVariation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a variation
router.delete('/:id', async (req, res) => {
  try {
    const variation = await ProductVariation.findByIdAndDelete(req.params.id);
    if (!variation) return res.status(404).json({ message: 'Variation not found' });
    
    // Check if parent has any other variations left, if not, set hasVariations to false
    const remaining = await ProductVariation.countDocuments({ menuItem: variation.menuItem });
    if (remaining === 0) {
      await MenuItem.findByIdAndUpdate(variation.menuItem, { hasVariations: false });
    }
    
    res.json({ message: 'Variation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
