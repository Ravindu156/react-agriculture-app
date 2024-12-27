const express = require('express');
const multer = require('multer');
const Article = require('../models/Article');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Add an article
router.post('/addArticle', upload.single('image'), async (req, res) => {
  try {
    const { title, author, date, category, content } = req.body;
    const newArticle = new Article({
      title,
      author,
      date,
      category,
      content,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await newArticle.save();
    res.status(201).json({ message: 'Article added successfully', article: newArticle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding article' });
  }
});

module.exports = router;
