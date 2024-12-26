const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ArticleModel = require('../models/Article'); // Adjust the path as necessary

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure that 'uploads' folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Create a unique filename
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Define the route for adding an article
router.post('/addArticle', async (req, res) => {
    try {
      const { title, author, date, category, content } = req.body;
      const image = req.file; // Assuming you're handling image upload via multer
  
      // Create a new article instance and save to the database
      const newArticle = new Article({ title, author, date, category, content, image });
      await newArticle.save();
      
      res.status(201).json({ message: 'Article added successfully', article: newArticle });
    } catch (error) {
      console.error('Error adding article:', error);
      res.status(500).json({ message: 'Error adding article. Please try again.' });
    }
  });
  

module.exports = router;
