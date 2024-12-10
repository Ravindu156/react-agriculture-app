const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    const { firstname,lastname,username, email, mobile, region, nic,role, password, education, occupation, experience } = req.body;
    const userData = {
        firstname,
        lastname,
        username,
        email,
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
    
module.exports = router;