<<<<<<< HEAD
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
=======
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
>>>>>>> 5b86e050196a97dc38d60f5c7b63aaea1cc9997f
