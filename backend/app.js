// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection URL
const mongoURI = 'mongodb+srv://deepak028ap:DIOgtPGkp3HWGTto@cluster0.znqykzl.mongodb.net/movies'; // Replace with your MongoDB connection string

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
const bookingsRoute = require('./routes/bookings');
app.use('/api/bookings', bookingsRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
