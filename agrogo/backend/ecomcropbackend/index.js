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

app.post("/login",(req,res) => {
   const {email} =req.body;
   userModel.findOne({ email : email },(err,result) => {
    if(result){
      const dataSend = {
        _id: result._id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        image: result.image,
      };
      console.log(dataSend);
      res.send({
        message: "Login is successfully",
        alert: true,
        data: dataSend,
      });
    } else {
      res.send({
        message: "Email is not available, please sign up",
        alert: false,
      });
    
    }
   })
})



const schemaProduct = mongoose.Schema({
   name:String,
   category:String,
   image:String,
   price:String,
   description:String,

});
const productModel = mogoose.model("product",schemaProduct)




  app.post("/uploadProduct",async(req,res)=>{

  })





app.listen(PORT,()=>console.log("Server is running at port :" + PORT))


