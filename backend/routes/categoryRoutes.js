const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const MenuItem = require('../models/MenuItem');

const DEFAULT_CATEGORIES = [
  { name: 'Bites', slug: 'bites', icon: '🍢', desc: 'Handcrafted small bites and appetizers', itemCount: 5, displayOrder: 1 },
  { name: 'Bowls', slug: 'bowls', icon: '🥗', desc: 'Nutrient-packed delicious bowls', itemCount: 2, displayOrder: 2 },
  { name: 'Desserts', slug: 'desserts', icon: '🍰', desc: 'World-famous cheesecakes and specialty desserts', itemCount: 10, displayOrder: 3 },
  { name: 'Breakfast', slug: 'breakfast', icon: '🍳', desc: 'Fresh breakfast favorites served all day', itemCount: 6, displayOrder: 4 },
  { name: 'Pastas', slug: 'pastas', icon: '🍝', desc: 'Handmade Italian style signature pastas', itemCount: 17, displayOrder: 5 },
  { name: 'Sandwiches', slug: 'sandwiches', icon: '🥪', desc: 'Gourmet sandwiches and rolls', itemCount: 1, displayOrder: 6 },
  { name: 'Burgers', slug: 'burgers', icon: '🍔', desc: 'Juicy handcrafted beef and chicken burgers', itemCount: 5, displayOrder: 7 },
  { name: 'Soups', slug: 'soups', icon: '🍲', desc: 'Rich and creamy comforting soups', itemCount: 5, displayOrder: 8 },
  { name: 'Appetizers', slug: 'appetizers', icon: '🥟', desc: 'Flavorful starters for sharing', itemCount: 17, displayOrder: 9 },
  { name: 'Drinks', slug: 'drinks', icon: '🥤', desc: 'Refreshing beverages, shakes, and cold coffees', itemCount: 22, displayOrder: 10 },
  { name: 'Pizzas', slug: 'pizzas', icon: '🍕', desc: 'Wood-fired crispy dough pizzas', itemCount: 9, displayOrder: 11 },
  { name: 'Salads', slug: 'salads', icon: '🥗', desc: 'Fresh garden salads with housemade dressings', itemCount: 5, displayOrder: 12 }
];

// GET all categories (auto-seed if empty)
router.get('/', async (req, res) => {
  try {
    let categories = await Category.find().sort({ displayOrder: 1, name: 1 });
    
    if (categories.length === 0) {
      try {
        categories = await Category.insertMany(DEFAULT_CATEGORIES);
      } catch (_seedErr) {
        categories = await Category.find().sort({ displayOrder: 1, name: 1 });
      }
    }
    
    // Dynamically calculate current item counts from MenuItem collection
    let counts = [];
    try {
      counts = await MenuItem.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
      ]);
    } catch (_aggErr) { }
    
    const countMap = {};
    (counts || []).forEach(c => {
      if (c && c._id) countMap[String(c._id).toLowerCase()] = c.count;
    });

    const result = categories.map(cat => {
      const catObj = cat.toObject ? cat.toObject() : cat;
      const actualCount = countMap[catObj.slug] !== undefined ? countMap[catObj.slug] : (catObj.itemCount || 0);
      return { ...catObj, id: catObj._id || catObj.id, _id: catObj._id || catObj.id, itemCount: actualCount };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new category
router.post('/', async (req, res) => {
  const body = req.body || {};
  const name = body.name || 'New Category';
  const icon = body.icon || '🍽️';
  const desc = body.desc || '';
  const displayOrder = body.displayOrder !== undefined ? body.displayOrder : 99;
  const active = body.active !== undefined ? body.active : true;

  let slug = body.slug || name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
  if (!slug) {
    slug = `cat-${Date.now()}`;
  }

  // Ensure slug uniqueness
  try {
    let existing = await Category.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const category = new Category({
      name,
      slug,
      icon,
      desc,
      displayOrder,
      active
    });

    const newCat = await category.save();
    const catObj = newCat.toObject();
    res.status(201).json({ ...catObj, id: catObj._id, _id: catObj._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const DUMMY_SLUG_MAP = {
  'cat-1': 'bites',
  'cat-2': 'bowls',
  'cat-3': 'desserts',
  'cat-4': 'breakfast',
  'cat-5': 'pastas',
  'cat-6': 'sandwiches',
  'cat-7': 'burgers',
  'cat-8': 'soups',
  'cat-9': 'appetizers',
  'cat-10': 'drinks',
  'cat-11': 'pizzas',
  'cat-12': 'salads'
};

// PUT update category
router.put('/:id', async (req, res) => {
  try {
    const rawId = req.params.id;
    const target = DUMMY_SLUG_MAP[rawId] || rawId;
    let updated;
    
    if (mongoose.Types.ObjectId.isValid(target)) {
      updated = await Category.findByIdAndUpdate(target, req.body, { new: true });
    }
    if (!updated) {
      updated = await Category.findOneAndUpdate({ slug: target.toLowerCase() }, req.body, { new: true });
    }
    if (!updated && req.body && req.body.name) {
      const slug = req.body.slug || target.toLowerCase();
      const newCat = new Category({ ...req.body, slug });
      updated = await newCat.save();
    }
    if (!updated) return res.status(404).json({ message: 'Category not found' });
    const catObj = updated.toObject();
    res.json({ ...catObj, id: catObj._id, _id: catObj._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE category
router.delete('/:id', async (req, res) => {
  try {
    const rawId = req.params.id;
    const target = DUMMY_SLUG_MAP[rawId] || rawId;
    let cat;
    if (mongoose.Types.ObjectId.isValid(target)) {
      cat = await Category.findByIdAndDelete(target);
    }
    if (!cat) {
      cat = await Category.findOneAndDelete({ slug: target.toLowerCase() });
    }
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

