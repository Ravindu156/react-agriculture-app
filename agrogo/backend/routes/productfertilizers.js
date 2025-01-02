
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const productfertilizerModel = require('../models/ProductFertilizer')
const verifyToken = require("../middleware/auth");

// routes/productfertilizerroute.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const productFertilizerModel = require('../models/ProductFertilizer');
//const verifyToken = require("./auth");

const router = express.Router();
const verifyToken = require('../middleware/auth');



//
// app.get("/product",verifyToken,async(req,res)=>{
//     try{
//      const data = await productfertilizerModel.find({})
//      res.send(JSON.stringify(data))
//    } catch (err) {
//      res.status(500).send({ message: "Error fetching products" });
//  }
//  })
   
  

// Save fertilizer product in the database
router.post("/uploadFertilizerProduct", verifyToken, async (req, res) => {
    try {
        console.log(req.body);
        const data = new productFertilizerModel(req.body);  // Use the new model name
        const dataSave = await data.save();
        res.send({ message: "Upload fertilizer product successfully", data: dataSave });
    } catch (err) {
        res.status(500).send({ message: "Error uploading fertilizer product" });
    }
});


// Get all fertilizer products
router.get("/fertilizerProducts", verifyToken, async (req, res) => {
    try {
        const data = await productFertilizerModel.find({});  // Use the new model name
        res.send(JSON.stringify(data));
    } catch (err) {
        res.status(500).send({ message: "Error fetching fertilizer products" });
    }
});

module.exports = router;
