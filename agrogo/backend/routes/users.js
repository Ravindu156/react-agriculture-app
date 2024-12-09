const express = require('express');
const router = express.Router();
const User = require('../models/User');

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
        //const salt = await bcrypt.genSalt(10);
        //userData.password = await bcrypt.hash(password, salt);
        const newUser = new User(userData);
        await newUser.save();
        res.json(newUser);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
    
module.exports = router;