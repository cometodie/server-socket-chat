const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Chat = require('../models/chat.model');
const jwt = require('jsonwebtoken');

router.get('/chat/:id', (req, res) => {

});

router.get('/chat', function (req, res) {

})

router.post('/chat', (req, res) => {
  const { users, messages } = req.body
  const chat = new Chat({
    _id: new mongoose.Types.ObjectId(),
    users,
    messages,
  });

  chat.save().then(() => {
    res.status(200).json({
      success: 'New chat created'
    });
  }).catch((error) => {
    res.status(500).json({ error });
  });
});

module.exports = router;
