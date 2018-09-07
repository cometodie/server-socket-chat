const mongoose = require('mongoose');

const post = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: { type: String, required: true },
  type: { type: Number, required: true },
  avatar: { type: String, required: true },
  author: { type: String, required: true },
  content: {
    photo: String,
    video: String,
    publication: [String]
  },
  date: String,
});

module.exports = mongoose.model('Post', post);
