const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true }, 
    lastname: { type: String, required: true }, 
    username: {type:String, required:true, unique: true },
    email:{type:String, required:true,unique:true},
    mobile: { type: String},
    gender:{type:String},
    region:{type:String},
    role:{type:String, required:true},
    nic: { type: String },
    password:{type:String},
    education: { type: String },
  occupation: { type: String },
  experience: { type: String},
});

module.exports = mongoose.model('User',userSchema);


