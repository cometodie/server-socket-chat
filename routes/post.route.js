const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

router.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  Post.findById(id, (err, post) => {
    if (!err) {
      res.send(post)
    } else {
      res.send(404)
    }
  })
});

router.get('/posts', function (req, res) {
  const userId = jwt.decode(req.headers.authorization.split(' ')[1])._id;
  User.findById(userId, (err, user) => {
    Post.find({ _id: { $in: user.posts } }).then(posts => {
      res.send(posts.map(post => {
        const { _id, ...postOther } = post
        return {
          id: _id,
          ...postOther._doc,
        }
      }))
    })
  })
})

router.post('/posts', (req, res) => {
  const { userId, type, avatar, content, date } = req.body
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    date,
    type,
    userId,
    avatar,
    content,
  });

  User.findById(userId, (error, user) => {
    if (error) {
      res.status(500)
    } else {
      user.posts = (user.posts || []).concat(post._id);
      User.findByIdAndUpdate(user._id, user, () => { })
      post.save().then(() => {
        res.status(200).json({
          success: 'New post created'
        });
      }).catch((error) => {
        res.status(500).json({ error });
      });
    }
  })
});

module.exports = router;
