const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const router = express.Router();

//save product in data
//api
router.post("/uploadProduct",async(req,res)=>{
    console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message:"upload successfully"})
})


//
router.get("/product",async(req,res)=>{
    const data = await productModel.find({})
    res.send(JSON.stringify(data))
  })
  

  module.exports = router;