const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const verifyToken = require("./auth");

const app = express()
app.use(cors())

const PORT = process.env.PORT || 8080

//mongoDB connection

mongoose.connect('mongodb://localhost:27017/fertlizer_store') 
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))

//product section
const schemaProductfertilizers = mongoose.Schema({
    name:String,
    category:String,
    image:String,
    price:String,
    description:String
})
const productfertilizerModel = mongoose.model("product",schemaProductfertilizer)

//save product in data
//api
app.post("/uploadProduct",verifyToken,async(req,res)=>{
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
    const data = await productfertilizerModel.find({})
    res.send(JSON.stringify(data))
  })
  
//api
app.get("/",(req,res)=>{
    res.send("Server is running")
})

app.listen(PORT,()=>console.log("server is running at port : " +PORT))