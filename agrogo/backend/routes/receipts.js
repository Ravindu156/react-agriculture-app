const express = require('express');
const router = express.Router();
const Receipt = require('../models/Receipts');
const SellerProduct = require('../models/sellerProduct');


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
  
  router.get('/allrec', (req, res) => {
    Receipt.find({})
      .then((receipts) => res.status(200).json(receipts))
      .catch((err) => res.status(500).json({ message: 'Error fetching products', error: err }));
  });

  // Route to delete existing queries based on selected IDs
  router.delete('/:id',  async (req, res) => {
    try {
        
       const { id } = req.params;
       await Receipt.findByIdAndDelete(id);
       const receipt = await Receipt.findById(id);
       await SellerProduct.deleteMany({ _id: { $in: receipt.selectedProducts } });
       await Receipt.findByIdAndDelete(id);
  
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  });

 


  module.exports = router;