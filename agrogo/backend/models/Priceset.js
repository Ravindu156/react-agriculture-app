const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
  product: String,
  category: String,
  price: Number,
  date: String,
});

const Priceset = mongoose.model('SellerProduct', PriceSchema);

module.exports = Priceset;