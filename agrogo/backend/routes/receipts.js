const express = require('express');
const router = express.Router();
const Receipt = require('../models/Receipts');


router.post('/receipts',  (req, res) => {
    
        const { buyerId, currentPrice, date, selectedProducts, totalQuantity, totalPrice } = req.body;
  
        // Create a new receipt
        const newReceipt = new Receipt({
            buyerId,
            currentPrice,
            date,
            selectedProducts,
            totalQuantity,
            totalPrice
        });
  
         newReceipt.save()
         .then((buyerId) => {
            res.status(201).json({ message: 'buyer created successfully',buyerId });
          })
          .catch((err) => {
            res.status(500).json({ message: 'Error creating buyer', error: err });
          });
  });
  
  // Route to delete existing queries based on selected IDs
  router.delete('/receipts/:id',  async (req, res) => {
    try {
        const { id } = req.params;
        await sellerProductModel.deleteMany({ _id: { $in: id } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });

  module.exports = router;