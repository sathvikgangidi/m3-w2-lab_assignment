
require('dotenv').config();

const mongoose = require('mongoose');

require('./models/Registration');

mongoose.connect(process.env.DATABASE)
  .then(() => {
    console.log('Mongoose connection open');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
  });

const app = require('./app');

const server = app.listen(3000, function() {
  console.log(`Express is running on port ${server.address().port}`);
});
