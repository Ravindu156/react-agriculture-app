

// const mongoose = require('mongoose');

// // Define the schema
// const schemaproductfertilizer = new mongoose.Schema({
//     name: String,
//     category: String,
//     image: String,
//     price: String,
//     description: String,
// });

// // Use existing model if it exists, otherwise create a new one
// const productfertilizerModel =
//     mongoose.models.product || mongoose.model("product", schemaproductfertilizer);

// module.exports = productfertilizerModel;

//product section
// const mongoose = require('mongoose');

// const schemaproductfertilizer = mongoose.Schema({
//     name:String,
//     category:String,
//     image:String,
//     price:String,
//     description:String
// })
// const productfertilizerModel = mongoose.model("fertilizer",schemaproductfertilizer)

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

