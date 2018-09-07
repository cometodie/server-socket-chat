const mongoose = require('mongoose');

const user = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true },
  password: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  login: { type: String, required: true },
  photo: { type: String, required: false },
  postCount: { type: Number, required: false, default: 0 },
  subscribersCount: { type: Number, required: false, default: 0 },
  subscriptionsCount: { type: Number, required: false, default: 0 },
  token: { type: String, required: false },
  posts: [String],
});

module.exports = mongoose.model('User', user);