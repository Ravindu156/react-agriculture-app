/// models/productfertilizer.js
const mongoose = require('mongoose');

// Rename the schema to be more specific
const productFertilizerSchema = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});

// Rename the model to be distinct
const productFertilizerModel = mongoose.model("ProductFertilizer", productFertilizerSchema);

module.exports = productFertilizerModel;
