const express = require('express');
const router = express.Router();
const  productModel = require('../models/Product');
const verify = require('../middleware/auth');

router.post("/uploadProduct",verify,async(req,res)=>{
    
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message : "Upload successfully", data: data});
    console.log(data);
})


router.get("/product",verify,async(req,res)=>{
  const data = await productModel.find({})
  res.send(JSON.stringify(data))
})
 

module.exports = router;