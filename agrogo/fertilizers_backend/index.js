const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(cors())

const PORT = process.env.PORT || 8080

//mongoDB connection

mongoose.connect('mongodb://localhost:27017/fertlizer_store') 
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))

//product section
const schemaProduct = mongoose.Schema({
    name:String,
    category:String,
    image:String,
    price:String,
    description:String
})
const productModel = mongoose.model("product",schemaProduct)

//save product in data
//api
app.post("/uploadProduct",async(req,res)=>{
    console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message:"upload successfully"})
})

//api
app.get("/",(req,res)=>{
    res.send("Server is running")
})

app.listen(PORT,()=>console.log("server is running at port : " +PORT))