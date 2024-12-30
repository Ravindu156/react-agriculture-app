const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const userRoutes = require('./routes/users');
const multer = require('multer');
const path = require('path');
const articleRoutes = require('./routes/article');


app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images


mongoose.connect("mongodb+srv://sanduni06nisansala:GXxRkwZRrQmkzQB2@agrogo.rbxzr.mongodb.net/AgroGo", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


    app.use('/api/users', userRoutes);

    // Routes
app.use('/api/articles', articleRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));