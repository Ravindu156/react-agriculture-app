

const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
});

const ArticleModel = mongoose.model("Article", articleSchema);

module.exports = ArticleModel;