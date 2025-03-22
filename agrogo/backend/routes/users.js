const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const secretekey='vau@group14';
const jwt = require('jsonwebtoken');
const verify = require('../middleware/auth');

router.post('/', async (req, res) => {
    const { firstname,lastname,username, email, mobile,gender, region, nic,role, password, education, occupation, experience } = req.body;
    
    if (mobile.length !== 10) {
      return res.status(400).json({ message: 'Mobile number must be 10 digits long' });
    }
    if (nic.length < 10) {
      return res.status(400).json({ message: 'NIC number is incorrect' });
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'Password must be at least 8 characters, including one uppercase letter, one number, and one special character.' });
    }

    const userData = {
        firstname,
        lastname,
        username,
        email,
        gender,
        mobile,
        region,
        nic,
        role,
        password,
      };

      if (role === "Agricultural Executive Officer") {
        userData.education = education;
        userData.occupation = occupation;
        userData.experience = experience;
      }
      try {
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(password, salt);
        const newUser = new User(userData);
        await newUser.save();
        res.json(newUser);
      } catch (error) {
        if (error.code === 11000) {
          const duplicateField = Object.keys(error.keyValue)[0];
          return res.status(400).json({
            message: `The ${duplicateField} is already taken. Please use a different ${duplicateField}.`,
          });
        }
        res.status(500).json({ error: error.message });
      }
    });


    router.post('/login', async (req, res) => {
      const { email, password } = req.body;
    
      try {
        const user = await User.findOne({ email });
        if (!user) {
          console.error('User not found for email:', email);
          return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          console.error('Password mismatch for email:', email);
          return res.status(401).json({ message: 'Invalid email or password' });
        }
        
    
        const token = jwt.sign({ userId: user._id }, secretekey, { expiresIn: '10h' });
        console.log('Generated Token:', token); 
  
        res.status(200).json({
          token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
        });
      } catch (err) {
        
        console.error('Error in login:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
      }
    });

    router.get('/aeos', async (req, res) => {
      try {
        const aeos = await User.find({ role: "Agricultural Executive Officer" });
        res.json(aeos);
      } catch (error) {
        res.status(500).json({ message: "Error fetching AEOs" });
      }
    });

 const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Store OTPs temporarily (in production, use Redis or another suitable database)
const otpStore = {};

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your preferred email service
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Route to request OTP
router.post('/request-otp', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with expiry (2 minutes)
    otpStore[email] = {
      otp,
      expiry: Date.now() + 2 * 60 * 1000 // 2 minutes
    };
    
    // Send email with OTP
    const mailOptions = {
      from: process.env.EMAIL_PASSWORD,
      to: email,
      subject: 'AgroGo Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #2f855a; text-align: center;">AgroGo</h1>
          <h2 style="text-align: center;">Password Reset</h2>
          <p>You requested to reset your password. Use the following OTP to proceed:</p>
          <div style="text-align: center; padding: 15px; background-color: #f0fff4; border-radius: 5px; margin: 20px 0;">
            <h2 style="letter-spacing: 5px; font-size: 24px; margin: 0;">${otp}</h2>
          </div>
          <p>This OTP will expire in 2 minutes.</p>
          <p>If you didn't request this, please ignore this email or contact support if you have concerns.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #666; text-align: center;">This is an automated email, please do not reply.</p>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('OTP request error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to verify OTP
router.post('/verify-otp', (req, res) => {
  try {
    const { email, otp } = req.body;
    
    // Check if OTP exists and is valid
    const otpData = otpStore[email];
    if (!otpData) {
      return res.status(400).json({ message: 'OTP not found or expired. Please request a new one.' });
    }
    
    // Check if OTP is expired
    if (Date.now() > otpData.expiry) {
      delete otpStore[email]; // Clean up expired OTP
      return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
    }
    
    // Verify OTP
    if (otpData.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }
    
    // OTP is valid
    // We'll keep the OTP data for now as a verification flag
    // It will be cleaned up after password reset or will expire naturally
    return res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('OTP verification error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    
    // Check if OTP was verified (by checking if entry exists)
    const otpData = otpStore[email];
    if (!otpData) {
      return res.status(401).json({ message: 'OTP verification required before password reset' });
    }
    
    // Clean up the OTP data as it's no longer needed
    delete otpStore[email];
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Hash the new password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update the user's password with the hashed version
    user.password = hashedPassword;
    await user.save();
    
    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// Display all users
router.get('/getusers', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.json(users); // Send the user data as JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

router.post('/logout', verify, async (req, res) => {
  try {
    res.status(200).json({ 
      success: true,
      message: 'Logout successful. Please remove the token from your client storage.' 
    });
  } catch (error) {
    console.error('Error in logout:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
module.exports = router;