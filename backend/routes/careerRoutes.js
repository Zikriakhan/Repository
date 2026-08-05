const express = require('express');
const router = express.Router();
const Career = require('../models/Career');

// GET all careers
router.get('/', async (req, res) => {
  try {
    const careers = await Career.find();
    res.json(careers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new career
router.post('/', async (req, res) => {
  const career = new Career(req.body);
  try {
    const newCareer = await career.save();
    res.status(201).json(newCareer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a career
router.put('/:id', async (req, res) => {
  try {
    const updatedCareer = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCareer) return res.status(404).json({ message: 'Career not found' });
    res.json(updatedCareer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a career
router.delete('/:id', async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) return res.status(404).json({ message: 'Career not found' });
    res.json({ message: 'Career deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
