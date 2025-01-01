const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const productfertilizerModel = require('../models/ProductFertilizer')
const verifyToken = require("./auth");
const router = express.Router();

//save product in data
//api
router.post("/uploadProduct",verifyToken,async(req,res)=>{
    console.log(req.body)
    const data = await productfertilizerModel(req.body)
    const datasave = await data.save()
    res.send({message:"upload successfully"})
})


//
router.get("/product",verifyToken,async(req,res)=>{
    const data = await productfertilizerModel.find({})
    res.send(JSON.stringify(data))
  })
  

  module.exports = router;