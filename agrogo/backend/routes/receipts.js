const express = require('express');
const router = express.Router();
const Receipt = require('../models/Receipts');
const SellerProduct = require('../models/sellerProduct');


router.post('/receipts', async (req, res) => {  
  try {
      const { buyerId, currentPrice, date, selectedProducts, totalQuantity, totalPrice } = req.body;

      // Create and save a new receipt
      const newReceipt = new Receipt({
          buyerId,
          currentPrice,
          date,
          selectedProducts,
          totalQuantity,
          totalPrice
      });

      await newReceipt.save();  

      // Find and update the selected products' quantities to 0
      const productIds = selectedProducts.map(product => product.productId);

      await SellerProduct.updateMany(
          { _id: { $in: productIds } },  
          { $set: { quantity: 0 } }      
      );

      res.status(201).json({ message: 'Receipt created and product quantities updated successfully', receipt: newReceipt });

  } catch (err) {
      res.status(500).json({ message: 'Error processing receipt', error: err });
  }
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