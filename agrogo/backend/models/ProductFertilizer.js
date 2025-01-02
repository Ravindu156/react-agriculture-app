const mongoose = require('mongoose');

// Define the schema
const schemaproductfertilizer = new mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: String,
    description: String,
});

// Use existing model if it exists, otherwise create a new one
const productfertilizerModel =
    mongoose.models.product || mongoose.model("product", schemaproductfertilizer);

module.exports = productfertilizerModel;
