// Import necessary dependencies


const express = require('express');
const multer = require('multer');
const Article = require('../models/Article');
const verify = require('../middleware/authh');
const router = express.Router();
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Store in the 'uploads' folder inside 'backend'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Add timestamp to the file name to avoid conflicts
  },
});

const upload = multer({ storage });

// Route to add an article (with image upload)
router.post('/addArticle', upload.single('image'), verify, async (req, res) => {
  try {
    // Destructure article data from the request body
    const { title, author, date, category, content } = req.body;

    // Create a new article object
    const newArticle = new Article({
      title,
      author,
      date,
      category,
      content,
      image: req.file ? `/uploads/${req.file.filename}` : null, // Save the image path (relative to your server)
      adminApproval: false,  // Set adminApproval to false by default
    });

    // Save the new article to the database
    await newArticle.save();

    // Send a response with the success message and the article data
    res.status(201).json({ message: 'Article added successfully', article: newArticle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding article' });
  }
});


// Get approved articles
router.get('/approved', async (req, res) => {
  try {
    // Find all articles where adminApproval is true
    const approvedArticles = await Article.find({ adminApproval: true });

    // If no approved articles are found
    if (!approvedArticles || approvedArticles.length === 0) {
      return res.status(404).json({ message: 'No approved articles found' });
    }

    // Return the list of approved articles
    res.status(200).json(approvedArticles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching approved articles' });
  }
});


// Get all articles
router.get('/getArticles', async (req, res) => {
  try {
    const articles = await Article.find(); // Fetch all articles from the database
    res.status(200).json(articles); // Return the articles in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching articles' });
  }
});



// Toggle admin approval status for an article
router.put('/toggleApproval/:id', verify, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Toggle the adminApproval status
    article.adminApproval = !article.adminApproval;
    await article.save();

    res.status(200).json({ message: 'Approval status updated', article });
  } catch (error) {
    console.error('Error toggling approval status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Serve static files from the 'uploads' directory
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Export the router for use in the main application
module.exports = router;








































// const express = require('express');
// const multer = require('multer');
// const Article = require('../models/Article');
// const verify = require('../middleware/authh');
// const router = express.Router();

// // Configure multer for file uploads
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, 'agrogo/backend/uploads/');
// //   },
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path.join(__dirname, '../../uploads')); // Corrected path
//     },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });
// const upload = multer({ storage });

// // Add an article (with image upload and adminApproval set to false)
// router.post('/addArticle', upload.single('image'), verify, async (req, res) => {
//   try {
//     // Destructure article data from the request body
//     const { title, author, date, category, content } = req.body;

//     // Create a new article
//     const newArticle = new Article({
//       title,
//       author,
//       date,
//       category,
//       content,
//       image: req.file ? `/uploads/${req.file.filename}` : null,  // Save the image path
//       adminApproval: false,  // Set adminApproval to false by default
//     });

//     // Save the article to the database
//     await newArticle.save();

//     // Send a response with success message and the article
//     res.status(201).json({ message: 'Article added successfully', article: newArticle });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error adding article' });  // Handle error
//   }
// });

// // // Get all articles
// // router.get('/getArticles', async (req, res) => {
// //   try {
// //     const articles = await Article.find(); // Fetch all articles from the database
// //     res.status(200).json(articles); // Return the articles in the response
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Error fetching articles' });
// //   }
// // });


// // Get approved articles
// router.get('/approved', async (req, res) => {
//   try {
//     // Find all articles where adminApproval is true
//     const approvedArticles = await Article.find({ adminApproval: true });

//     // If no approved articles are found
//     if (!approvedArticles || approvedArticles.length === 0) {
//       return res.status(404).json({ message: 'No approved articles found' });
//     }

//     // Return the list of approved articles
//     res.status(200).json(approvedArticles);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching approved articles' });
//   }
// });


// router.use('/uploads', express.static('agrogo/backend/uploads'));

// module.exports = router;
