const mongoose = require('mongoose');

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
  priceHistory: [{
    price: String,
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  currentPrice: {
    type: String,
    default: ''
  }
});

const productModel = mongoose.model("product",schemaProduct)
module.exports = productModel;
