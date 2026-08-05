const express = require('express');
const router = express.Router();
const Reward = require('../models/Reward');

// GET all rewards
router.get('/', async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new reward
router.post('/', async (req, res) => {
  const reward = new Reward(req.body);
  try {
    const newReward = await reward.save();
    res.status(201).json(newReward);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a reward
router.put('/:id', async (req, res) => {
  try {
    const updatedReward = await Reward.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReward) return res.status(404).json({ message: 'Reward not found' });
    res.json(updatedReward);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a reward
router.delete('/:id', async (req, res) => {
  try {
    const reward = await Reward.findByIdAndDelete(req.params.id);
    if (!reward) return res.status(404).json({ message: 'Reward not found' });
    res.json({ message: 'Reward deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
