const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.json());


mongoose.connect("mongodb://localhost:27017/AgroGo", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));



const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
