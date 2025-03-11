const express = require('express');
const router = express.Router();
const Priceset = require('../models/Priceset');

router.post('/setprice', (req, res) => {
    const { product, category, price , date } = req.body;
  
    const newPrice = new Priceset({
      product,
      category,
      price,
      date,
    });
  
    newPrice.save()
      .then((product) => {
        res.status(201).json({ message: 'Product created successfully', product });
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error creating product', error: err });
      });
  });

  router.get('/chart-data', (req, res) => {
    const { name, category } = req.query;
  
    Priceset.find({ product: name, category })
      .then((products) => {
        if (products.length > 0) {
          // Extract prices and dates from the products
          const chartData = products.map((product) => ({
            date: product.date, // Date from the product
            price: product.price, // Price from the product
          }));
  
          // Get the last price and date
          const lastPrice = chartData[chartData.length - 1].price;
          const lastDate = chartData[chartData.length - 1].date;
  
          res.status(200).json({ chartData, lastPrice, lastDate }); // Send chart data, last price, and last date
        } else {
          res.status(404).json({ message: 'No matching products found' });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error fetching chart data', error: err });
      });
  });

  router.get('/all', (req, res) => {
    Priceset.find({})
      .then((products) => res.status(200).json(products))
      .catch((err) => res.status(500).json({ message: 'Error fetching products', error: err }));
  });

module.exports = router;