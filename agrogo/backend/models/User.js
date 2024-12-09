const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true }, 
    lastname: { type: String, required: true }, 
    username: {type:String, required:true},
    email:{type:String, required:true,uniqye:true},
    mobile: { type: String, required: true, unique: true },
    region:{type:String, required:true},
    role:{type:String, required:true},
    nic: { type: String, required: true },
    password:{type:String, required: true},
    education: { type: String, required: false },
  occupation: { type: String, required: false },
  experience: { type: String, required: false },
});

module.exports = mongoose.model('User',userSchema);