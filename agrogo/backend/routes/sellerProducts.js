const express = require('express');
const router = express.Router();
const SellerProduct = require('../models/sellerProduct');

// Route to create a new product
router.post('/create', (req, res) => {
  const { product, category, place, price, quantity, description } = req.body;

  const newProduct = new SellerProduct({
    product,
    category,
    place,
    price,
    quantity,
    description,
  });

  newProduct.save()
    .then((product) => {
      res.status(201).json({ message: 'Product created successfully', product });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error creating product', error: err });
    });
});

module.exports = router;