const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ extended: true, limit: '60mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routers
const cropsRouters = require('./routes/crops');
const productsRouters = require('./routes/products');
const userRoutes = require('./routes/users');
const articleRoutes = require('./routes/article');

app.use('/ecom/crops', cropsRouters);
app.use('/ecom/products', productsRouters);
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

// MongoDB Connection
mongoose
    .connect('mongodb+srv://sanduni06nisansala:GXxRkwZRrQmkzQB2@agrogo.rbxzr.mongodb.net/AgroGo', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
