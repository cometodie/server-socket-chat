const mongoose = require('mongoose')
const Message = require('./message.model')

const chat = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  users: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      photo: String,
    },
  ],
  messages: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      text: { type: String, required: true },
      date: String,
    },
  ],
})

module.exports = mongoose.model('Chat', chat)
