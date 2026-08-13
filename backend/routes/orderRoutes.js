const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const ProductVariation = require('../models/ProductVariation');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new order
router.post('/', async (req, res) => {
  try {
    const { customer, items, method, total } = req.body;
    let calculatedTotal = 0;
    const validatedItems = [];

    if (items && Array.isArray(items)) {
      for (const item of items) {
        let menuItem = null;
        try {
          menuItem = await MenuItem.findOne({ name: item.name });
        } catch (_e) {}

        let unitPrice = item.numPrice || item.price || (menuItem ? menuItem.numPrice : 0);
        let productId = menuItem ? menuItem._id : null;
        let variationName = item.variationName || undefined;

        if (menuItem && (item.variationId || item.variationName)) {
          try {
            const query = item.variationId ? { _id: item.variationId } : { menuItem: menuItem._id, name: item.variationName };
            const variation = await ProductVariation.findOne(query);
            if (variation) {
              unitPrice = variation.numPrice;
              variationName = variation.name;
            }
          } catch (_e) {}
        }

        const quantity = item.quantity || 1;
        const lineTotal = (parseFloat(unitPrice) || 0) * quantity;
        calculatedTotal += lineTotal;

        validatedItems.push({
          productId: productId,
          variationId: item.variationId || null,
          name: item.name,
          variationName: variationName,
          quantity: quantity,
          unitPrice: parseFloat(unitPrice) || 0,
          lineTotal: lineTotal,
          image: item.image || item.img || (menuItem ? menuItem.image : '')
        });
      }
    }

    const tax = calculatedTotal * 0.0825;
    const deliveryFee = method === 'delivery' ? 5.99 : 0;
    const finalTotal = total || (calculatedTotal + tax + deliveryFee);

    const order = new Order({
      customer: customer || 'Guest',
      items: validatedItems,
      total: parseFloat(finalTotal.toFixed(2)),
      status: 'Received',
      date: new Date()
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update an order status
router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an order (optional for admin panel)
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
