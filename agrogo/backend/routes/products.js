const express = require('express');
const router = express.Router();
const  productModel = require('../models/Product');

router.post("/uploadProduct",async(req,res)=>{
    const { name, category, image, price, description } = req.body;
    
    const productData = {
        name,
        category,
        image,
        price,
        description,
        currentPrice: price,
        priceHistory: [{
            price: price,
            updatedAt: new Date()
        }]
    };

    const data = await productModel(productData);
    const datasave = await data.save();
    res.send({message : "Upload successfully", data: data});
    console.log(data);
})


//
router.get("/product",async(req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})

// Get price history for a specific product
router.get("/priceHistory/:productId", async(req,res)=>{
  try {
    const product = await productModel.findById(req.params.productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.send({
      productName: product.name,
      priceHistory: product.priceHistory
    });
  } catch (error) {
    res.status(500).send({ message: "Error fetching price history", error });
  }
})

// Update product price
router.put("/updatePrice/:productId", async(req,res)=>{
  try {
    const { newPrice } = req.body;
    const product = await productModel.findById(req.params.productId);
    
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Add current price to history
    product.priceHistory.push({
      price: product.currentPrice,
      updatedAt: new Date()
    });

    // Update current price
    product.currentPrice = newPrice;
    product.price = newPrice;

    await product.save();
    res.send({ message: "Price updated successfully", product });
  } catch (error) {
    res.status(500).send({ message: "Error updating price", error });
  }
})

 

module.exports = router;
