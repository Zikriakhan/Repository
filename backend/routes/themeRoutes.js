const express = require('express');
const router = express.Router();
const Theme = require('../models/Theme');

// GET all themes
router.get('/', async (req, res) => {
  try {
    const themes = await Theme.find();
    res.json(themes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new theme
router.post('/', async (req, res) => {
  const theme = new Theme(req.body);
  try {
    // If this theme is active, deactivate others
    if (theme.active) {
      await Theme.updateMany({}, { active: false });
    }
    const newTheme = await theme.save();
    res.status(201).json(newTheme);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a theme
router.put('/:id', async (req, res) => {
  try {
    if (req.body.active) {
       await Theme.updateMany({}, { active: false });
    }
    const updatedTheme = await Theme.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTheme) return res.status(404).json({ message: 'Theme not found' });
    res.json(updatedTheme);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a theme
router.delete('/:id', async (req, res) => {
  try {
    const theme = await Theme.findByIdAndDelete(req.params.id);
    if (!theme) return res.status(404).json({ message: 'Theme not found' });
    res.json({ message: 'Theme deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
