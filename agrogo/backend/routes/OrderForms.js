const express = require('express');
const router = express.Router();
const Order = require('../models/OrderForm'); // Assuming you have the Order model in 'models/OrderForm.js'
const Product = require('../models/Product'); // Assuming you have the Product model in 'models/Product.js'
const verify = require('../middleware/auth');

// Create a new order
router.post('/', verify, async (req, res) => {
  const { products, shippingAddress, paymentMethod } = req.body;
  if (!products || products.length === 0) {
    return res.status(400).json({ message: 'At least one product must be ordered' });
  }

  // Ensure shippingAddress is provided
  if (!shippingAddress) {
    return res.status(400).json({ message: 'Shipping address is required' });
  }

  try {
    // Calculate the total price of the order
    let totalPrice = 0;
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.product} not found` });
      }
      totalPrice += product.price * item.quantity;
    }

    // Create the order
    const newOrder = new Order({
      user: req.userId, // Assuming req.userId is set by the verify middleware
      products,
      totalPrice,
      orderStatus: 'Pending',
      shippingAddress,
      paymentMethod,
    });

    await newOrder.save();
    res.status(201).json(newOrder);

  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all orders for a specific user
router.get('/user/:userId', verify, async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ user: userId }).populate('products.product', 'name price'); // Populate product details
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all orders (admin route)
router.get('/', verify, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'firstname lastname email'); // Populate user details
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status (admin route)
router.put('/status/:orderId', verify, async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  if (!['Pending', 'Shipped', 'Delivered', 'Cancelled'].includes(orderStatus)) {
    return res.status(400).json({ message: 'Invalid order status' });
  }

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.orderStatus = orderStatus;
    await order.save();
    res.json(order);

  } catch (error) {
    console.error('Error updating order:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete an order (admin route)
router.delete('/:orderId', verify, async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.remove();
    res.json({ message: 'Order deleted successfully' });

  } catch (error) {
    console.error('Error deleting order:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
