const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./middleware/middleware')(app, express);

mongoose.connect('mongodb://localhost:27017/rn-test').then(
  () => {
    console.log('DB connected!');
    app.listen(3000, () => {
      console.log('Server is running on Port', 3000);
    });
  },
  err => {
    console.log(err);
  }
);