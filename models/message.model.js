const mongoose = require('mongoose');

const message = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  chatId: mongoose.Schema.Types.ObjectId,
  text: { type: String, required: true },
  date: String,
});

module.exports = mongoose.model('Message', message);
