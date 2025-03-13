const express = require('express');
const router = express.Router();
const  productModel = require('../models/Product');
const verify = require('../middleware/auth');
const User = require('../models/User');

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
 

module.exports = router;

