const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
    buyerId:  Number,
    currentPrice: Number,
    date: String,
    selectedProducts: [
        {
            productId: String,
            quantity: Number
        }
    ],
    totalQuantity: Number,
    totalPrice: Number,
});

const Receipt = mongoose.model('Receipt', receiptSchema);

module.exports = Receipt;
