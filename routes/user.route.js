const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

router.get('/test', function(req, res) {
  res.send('test1111111')
})

router.get('/update-token', function(req, res) {
  User.findOne({ email: jwt.decode(req.query.token).email })
    .exec()
    .then(function(user) {
      if (user) {
        const JWTToken = jwt.sign(
          {
            email: user.email,
            _id: user._id
          },
          'secret',
          {
            expiresIn: '1h'
          }
        );
        user.token = JWTToken;
        User.update({ _id: user._id }, { user }, (err, status) => {
          return res.status(200).json({
            token: JWTToken
          });
        });
      } else {
        return res.status(401).json({
          failed: 'Unauthorized Access'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: 'User with this email does not exist!'
      });
    });
});
router.post('/signup', function(req, res) {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hash
      });
      user
        .save()
        .then(function(result) {
          console.log(result);
          res.status(200).json({
            success: 'New user has been created'
          });
        })
        .catch(error => {
          res.status(500).json({
            error: err
          });
        });
    }
  });
});

router.post('/signin', function(req, res) {
  User.findOne({ email: req.body.email })
    .exec()
    .then(function(user) {
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (err) {
          return res.status(401).json({
            failed: 'Unauthorized Access'
          });
        }
        if (result) {
          const JWTToken = jwt.sign(
            {
              email: user.email,
              _id: user._id
            },
            'secret',
            {
              expiresIn: '20s'
            }
          );
          user.token = JWTToken;
          User.findByIdAndUpdate(user._id, user, (err, status) => {
            return res.status(200).json({
              token: JWTToken
            });
          });
        } else {
          return res.status(401).json({
            failed: 'Unauthorized Access'
          });
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        error: 'User with this email does not exist!'
      });
    });
});

module.exports = router;
