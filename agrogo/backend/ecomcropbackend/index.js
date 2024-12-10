const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config();

const app = express()
app.use(cors())
app.use(express.json({limit: "10mb"}))

const PORT = process.env.PORT || 8080

//mongodb connection
console.log(process.env.MONGODB_URL)
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Connect to Databse"))
.catch((err) => console.log(err));


//Schema

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
  });

  //model

  const userModel = mongoose.model("user",userSchema)
  


//api
app.get("/",(req,res)=>{
    res.send("Server is running")
})

app.post("/signup",(req,res)=>{
    console.log(req.body)
    const { email } = req.body;


   const resultData = await userModel.findOne({email : email})
   
    console.log(resultData)
    if(!resultData){
        const data = userModel(req.body) 
                const save = data.save()
                res.send({message:"Successfully sign up"})
    }
    else{
        res.send({message: "Email id is already registered"})
    }







})

app.listen(PORT,()=>console.log("Server is running at port :" + PORT))


