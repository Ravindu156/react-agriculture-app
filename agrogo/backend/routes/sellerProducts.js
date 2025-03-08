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


router.get('/products-by-name', (req, res) => {
  const { name } = req.query;

  SellerProduct.find({ product: name })
    .then((products) => {
      if (products.length > 0) {
        // Extract _id and quantity from the products
        const productList = products.map((product) => ({
          _id: product._id,
          quantity: product.quantity,
        }));

        res.status(200).json(productList); // Send the list of products
      } else {
        res.status(404).json({ message: 'No products found for the selected name' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error fetching products', error: err });
    });
});

router.get('/all', (req, res) => {
  SellerProduct.find({})
    .then((products) => res.status(200).json(products))
    .catch((err) => res.status(500).json({ message: 'Error fetching products', error: err }));
});

router.get('/qnt', (req, res) => {
  SellerProduct.aggregate([
    {
      $group: {
        _id: "$product",
        totalQuantity: { $sum: "$quantity" }
      }
    }
  ])

    .then((products) => res.status(200).json(products))
    .catch((err) => res.status(500).json({ message: 'Error fetching products', error: err }));
});

router.get('/chart-quantity-data', (req, res) => {
  SellerProduct.aggregate([
    {
      $group: {
        _id: "$product",
        totalQuantity: { $sum: "$quantity" }
      }
    }
  ])
    .then((products) => {
      if (products.length > 0) {
        // Format data for the chart
        const chartData = products.map((product) => ({
          product: product._id, // Product name
          quantity: product.totalQuantity // Total quantity sold
        }));

        res.status(200).json({ chartData }); // Send formatted chart data
      } else {
        res.status(404).json({ message: 'No products found' });
      }
    })
    .catch((err) => res.status(500).json({ message: 'Error fetching chart data', error: err }));
});


module.exports = router;