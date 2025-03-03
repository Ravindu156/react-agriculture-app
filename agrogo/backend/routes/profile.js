const express = require("express");
const router = express.Router();
const User = require("../models/User"); 
const authMiddleware = require("../middleware/auth"); // Using existing auth middleware

// GET Profile (Private)
router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// UPDATE Profile (Private) - Update all fields except `_id`
router.put("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update only if the field exists in request body (except `_id`)
        Object.keys(req.body).forEach((key) => {
            if (key !== "_id") {
                user[key] = req.body[key];
            }
        });

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;