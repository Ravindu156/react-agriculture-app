const express=require("express");
const router = express.Router();
const User = require("../models/User");
const multer = require("multer");

// Configure Multer for profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Get user profile
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const { password, ...otherDetails } = user._doc; // Exclude password
      res.status(200).json(otherDetails);
    } catch (err) {
      res.status(500).json({ message: "Error fetching user details", error: err });
    }
  });
  
  // Update user profile
router.put("/:id", authenticateUser, async (req, res) => {
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        try {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(req.body.password, salt);
        } catch (err) {
          return res.status(500).json({ message: "Error updating password", error: err });
        }
      }
  
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true } // Return the updated user
        );
        res.status(200).json({ message: "Profile updated", user: updatedUser });
      } catch (err) {
        res.status(500).json({ message: "Error updating profile", error: err });
      }
    } else {
      res.status(403).json({ message: "You can only update your own profile" });
    }
  });

  // Delete user account
router.delete("/:id", authenticateUser, async (req, res) => {
    if (req.body.userId === req.params.id) {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Account deleted" });
      } catch (err) {
        res.status(500).json({ message: "Error deleting account", error: err });
      }
    } else {
      res.status(403).json({ message: "You can only delete your own account" });
    }
  });
  
  module.exports = router;