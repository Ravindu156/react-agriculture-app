const express = require('express');
const router = express.Router();
const ExchangeProduct = require('../models/Exchangeproduct');


router.post('/ecreate', async (req, res) => {
    try {
      const { product } = req.body;
      if (!product) {
        return res.status(400).json({ message: 'Product name is required' });
      }
  
      const newProduct = new ExchangeProduct({ product });
      await newProduct.save();
  
      res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error });
    }
  });
  
  // Route to get all products
  router.get('/eall', async (req, res) => {
    try {
      const products = await ExchangeProduct.find({});
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error });
    }
  });

  module.exports = router;