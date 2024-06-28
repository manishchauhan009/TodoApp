const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const todoRoutes = require('./routes/todoRoutes');
const { notFound, errorHandler } = require('./middlewares/errorHandler'); // Add this if you have the middleware

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api', todoRoutes);

app.use(notFound); // Middleware to handle 404
app.use(errorHandler); // Middleware to handle errors

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
