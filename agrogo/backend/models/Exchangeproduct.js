const mongoose = require('mongoose');

const exchangeProductSchema = new mongoose.Schema({
  product: { type: String, required: true },
  
});

const ExchangeProduct = mongoose.model('ExchangeProduct', exchangeProductSchema);

module.exports = ExchangeProduct;