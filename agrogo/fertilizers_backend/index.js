const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(cors())

const PORT = process.env.PORT || 8080

//mongoDB connection

mongoose.connect('mongodb://localhost:27017/products') 
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

//api
app.get("/",(req,res)=>{
    res.send("Server is running")
})

app.listen(PORT,()=>console.log("server is running at port : " +PORT))