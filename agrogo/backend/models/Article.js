const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Path to the uploaded image
  },
  adminApproval: {
    type: Boolean,
    default: false, // This will represent final approval by admin
  },
});

module.exports = mongoose.model('Article', articleSchema);
