const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const productfertilizerModel = require('../models/ProductFertilizer')
const verifyToken = require("./auth");
const router = express.Router();

//save product in data
//api
router.post("/uploadProduct",verifyToken,async(req,res)=>{
    try{
        console.log(req.body)
        const data = await productfertilizerModel(req.body)
        const datasave = await data.save()
        res.send({message:"upload successfully"})
        } catch (err) {
            res.status(500).send({ message: "Error uploading product" });
        }
    
    })

//
app.get("/product",verifyToken,async(req,res)=>{
    try{
     const data = await productfertilizerModel.find({})
     res.send(JSON.stringify(data))
   } catch (err) {
     res.status(500).send({ message: "Error fetching products" });
 }
 })
   
  

  module.exports = router;