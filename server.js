const express = require('express');
const app = express();
const mongoose = require('mongoose');
const middleware = require('./middleware/middleware')(app, express);
const jwt = require('jsonwebtoken');
const http = require('http').Server(app);
const io = require('socket.io')(http);
// const chatController = require('./logic/chat-socket')(http);
const Message = require('./models/message.model');

function databaseStore(id, msg, timeStamp) {
  const message = new Message({
    userId: id,
    text: msg,
    date: timeStamp
  });
  message.save().then(err => {
    if (err) return res.send(err);
  });
}

function databaseGetMessages() {
  Message.find({}, (err, results) => {
    if (results) {
      results = results.map(el => {
        el.type = 'all-messages';
        el.date = new Date(el.date).getTime();
        return el;
      });
      io.emit('all-messages', results);
    }
    if (err) {
      console.log(err);
    }
  });
}

mongoose.connect('mongodb://localhost:27017/jwtauth').then(
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

io.on('connection', socket => {
  console.log('user connected');
  databaseGetMessages();
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('add-message', message => {
    const timeStamp = new Date().getTime();
    console.log(message);
    io.emit('message', {
      userId: message.userId,
      type: 'new-message',
      text: message.message,
      date: timeStamp
    });
    databaseStore(message.userId, message.message, timeStamp);
  });
});

app.get('/checking', (req, res) => {
  res.send('darova');
});

http.listen(5000, () => {
  console.log('Server started on port 5000');
});
