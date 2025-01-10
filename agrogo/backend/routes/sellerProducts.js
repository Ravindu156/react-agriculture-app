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
  const { name, category } = req.query;

  SellerProduct.find({ product: name, category })
    .then((products) => {
      if (products.length > 0) {
        // Extract prices and dates from the products
        const chartData = products.map((product) => ({
          date: product.date, // Date from the product
          price: product.price, // Price from the product
        }));

        res.status(200).json(chartData); // Send chart data
      } else {
        res.status(404).json({ message: 'No matching products found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error fetching chart data', error: err });
    });
});




module.exports = router;