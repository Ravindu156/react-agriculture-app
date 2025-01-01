const mongoose = require('mongoose');

//schema

const cropSchema = mongoose.Schema({
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
  
  
  const cropModel = mongoose.model("crop", cropSchema);
  module.exports = cropModel;
  