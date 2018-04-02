const mongoose = require('mongoose');

const message = mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model('Message', message);
