const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    const { firstname,lastname,name, email, mobile, region, nic,role, password } = req.body;
    const newUser = new User({ firstname,lastname,name, email, mobile,region, nic,role, password });
    await newUser.save();
     res.json(newUser);
    });
    
module.exports = router;