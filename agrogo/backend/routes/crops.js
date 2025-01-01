const express = require('express');
const router = express.Router();
const { userModel } = require('../models/User')


router.get("/", (req, res) => {
    res.send("Server is running");
  });
  
  //sign up
  router.post("/signup", async (req, res) => {
    const { email } = req.body;
  
    /*userModel.findOne({ email: email }, (err, result) => {
      // console.log(result);
      console.log(err);
      if (result) {
        res.send({ message: "Email id is already register", alert: false });
      } else {
        const data = userModel(req.body);
        const save = data.save();
        res.send({ message: "Successfully sign up", alert: true });
      }
    });*/
  
    const resultData = await  userModel.findOne({email : email})
       console.log(resultData)
       if(!resultData){
           const data = userModel(req.body)
                   const save = data.save()
                   res.send({message:"Successfully sign up"})
       }
       else{
           res.send({message: "Email id is already registered"})
       }
  
  });
  
  //api login
  router.post("/login", (req, res) => {
    // console.log(req.body);
    const { email } = req.body;
    userModel.findOne({ email: email }, (err, result) => {
      if (result) {
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
    });
  });
  

  module.exports = router;