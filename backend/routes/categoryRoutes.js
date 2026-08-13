const express = require('express');
const router = express.Router();
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
      categories = await Category.insertMany(DEFAULT_CATEGORIES);
    }
    
    // Dynamically calculate current item counts from MenuItem collection
    const counts = await MenuItem.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    const countMap = {};
    counts.forEach(c => {
      if (c._id) countMap[c._id.toLowerCase()] = c.count;
    });

    const result = categories.map(cat => {
      const catObj = cat.toObject();
      const actualCount = countMap[catObj.slug] !== undefined ? countMap[catObj.slug] : catObj.itemCount;
      return { ...catObj, id: catObj._id, itemCount: actualCount };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new category
router.post('/', async (req, res) => {
  const { name, icon, desc, displayOrder } = req.body;
  const slug = req.body.slug || name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
  
  const category = new Category({
    name,
    slug,
    icon: icon || '🍽️',
    desc: desc || '',
    displayOrder: displayOrder || 99,
    active: true
  });

  try {
    const newCat = await category.save();
    res.status(201).json({ ...newCat.toObject(), id: newCat._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update category
router.put('/:id', async (req, res) => {
  try {
    const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Category not found' });
    res.json({ ...updated.toObject(), id: updated._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE category
router.delete('/:id', async (req, res) => {
  try {
    const cat = await Category.findByIdAndDelete(req.params.id);
    if (!cat) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
