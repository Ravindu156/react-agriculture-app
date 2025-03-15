const mongoose = require('mongoose');

const schemaProduct = mongoose.Schema({
  author:String,
  name: String,
  category:String,
  image: String,
  price: String,
  description: String,
  quantity:Number,
});
const productModel = mongoose.model("product",schemaProduct)
module.exports = productModel;
