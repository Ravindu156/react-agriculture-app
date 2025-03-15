const express = require('express');
const router = express.Router();
const  productModel = require('../models/Product');
const verify = require('../middleware/auth');
const User = require('../models/User');
const { default: mongoose } = require('mongoose');

router.post("/uploadProduct", verify, async (req, res) => {
  try {
    // Get the logged-in user's details (author) from the request object
    const author = await User.findById(req.user.id).select("-password");

    if (!author) {
      return res.status(404).json({ message: "User not found" });
    }

    // Collect the product details and add the author's name to it
    const productData = {
      name: req.body.name,             // Product name from the request body
      category: req.body.category,     // Product category from the request body
      image: req.body.image,           // Product image from the request body
      price: req.body.price,           // Product price from the request body
      description: req.body.description, // Product description from the request body
      quantity: req.body.quantity,     // Product quantity from the request body
      author: author.firstname + " " + author.lastname             // Add the logged-in user's name as author
    };

    // Create a new product instance with the data
    const newProduct = new productModel(productData);

    // Save the product to the database
    const savedProduct = await newProduct.save();

    // Send a success response with the saved product data
    res.send({ message: "Product uploaded successfully", data: savedProduct });
    console.log('Saved product:', savedProduct);
  } catch (error) {
    console.error("Error uploading product:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})


//Get Product by ID
router.get("/product/:id", async (req, res) => {
  const productId = req.params.id;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ success: false, message: "Invalid product ID" });
  }

  try {
    const data = await productModel.findById(productId);

    if (!data) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/reduceQuantity", async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Find product by ID
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    //check if enough stock is available 
    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }


  // Reduce the quantity
    product.quantity -= quantity;
    await product.save();


   res.json({ message: "Stock updated", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating stock", error });
  }
  

});

module.exports = router;