const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/users');
require('dotenv').config();
const chatRoutes = require('./routes/ChatBot')

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.json());


mongoose.connect("mongodb+srv://sanduni06nisansala:GXxRkwZRrQmkzQB2@agrogo.rbxzr.mongodb.net/AgroGo", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


    app.use('/api/users', userRoutes);
    app.use('/api/chat',chatRoutes)
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));