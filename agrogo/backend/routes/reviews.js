const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

// ✅ Add a new review
router.post("/", async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    const review = new Review({ name, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: "Failed to add review" });
  }
});

// ✅ Get all reviews (latest first)
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

module.exports = router;
