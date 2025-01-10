const mongoose = require('mongoose');

const sellerProductSchema = new mongoose.Schema({
  product: String,
  category: String,
  place: String,
  price: Number,
  quantity: Number,
  description: String,
  date: String,
});

const SellerProduct = mongoose.model('SellerProduct', sellerProductSchema);

module.exports = SellerProduct;