const express = require('express');
const router = express.Router();
const SellerProduct = require('../models/sellerProduct');

// Route to create a new product
router.post('/create', (req, res) => {
  const { product, category, place,price , quantity, description, date } = req.body;

  const newProduct = new SellerProduct({
    product,
    category,
    place,
    price,
    quantity,
    description,
    date,
  });

  newProduct.save()
    .then((product) => {
      res.status(201).json({ message: 'Product created successfully', product });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error creating product', error: err });
    });
});

router.get('/chart-data', (req, res) => {
  const { name, category, place } = req.query;

  SellerProduct.findOne({ product: name, category, place })
    .then((product) => {
      if (product) {
        res.status(200).json(product.chartData); // Send chart data
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error fetching chart data', error: err });
    });
});




module.exports = router;