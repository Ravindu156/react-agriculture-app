const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    const { name, email, region, role, password } = req.body;
    const newUser = new User({ name, email, region, role, password });
    await newUser.save();
     res.json(newUser);
    });
    
module.exports = router;