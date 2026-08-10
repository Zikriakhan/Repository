const express = require('express');
const router = express.Router();
const Promo = require('../models/Promo');

// Get all promos
router.get('/', async (req, res) => {
  try {
    const promos = await Promo.find();
    res.json(promos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update or create a promo by name
router.put('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const updateData = req.body;
    
    const promo = await Promo.findOneAndUpdate(
      { name },
      { $set: updateData },
      { new: true, upsert: true }
    );
    
    res.json(promo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
