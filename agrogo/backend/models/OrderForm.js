const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true }, // Reference to the Product model
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true }, // Price at the time of order
    }
  ],
  totalPrice: { type: Number, required: true }, // Total price of the order
  orderStatus: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  orderDate: { type: Date, default: Date.now }, // Date when the order was placed
  shippingAddress: { type: String, required: true }, // Address where the order will be shipped
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending',
  },
  paymentMethod: { type: String, required: true }, // Payment method used
});

module.exports = mongoose.model('Order', orderSchema);
