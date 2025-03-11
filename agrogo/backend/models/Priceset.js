const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema({
  product: String,
  category: String,
  price: Number,
  date: String,
});

const Priceset = mongoose.model('Priceset', PriceSchema);

module.exports = Priceset;