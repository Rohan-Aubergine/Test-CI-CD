const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const mongoose=require('mongoose')



const app = express();
mongoose.connect(config.mongo_uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error', error));

// Middleware
app.use(cors());
app.use(express.json());

// Define your routes here
const exampleRoutes = require('./routes/exampleRoutes');
app.use('/api/v1', exampleRoutes);

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});