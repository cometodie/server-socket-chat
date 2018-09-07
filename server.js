const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Chat = require('./models/chat.model');

require('./middleware/middleware')(app, express);

http.listen(3000)

mongoose.connect('mongodb://localhost:27017/rn-test').then(
  () => {
    console.log('DB connected!');

    // app.listen(3000, () => { });
  },
  err => { }
);

io.on('connection', socket => {
  console.log('connected! ');

  socket.on('open-chat', (chatId) => {
    // Save the message document in the `messages` collection.
    Chat.findById(chatId, (err, chat) => {
      socket.emit('messages', chat)
      // console.log(chat)
    })

    // The `broadcast` allows us to send to all users but the sender.
    // socket.broadcast.emit('message', message);
  });

  socket.on('message', message => {
    console.log(message)
    const { text, chatId, userId } = message
    if (text && chatId && userId) {
      Chat.findById(chatId, (err, chat) => {
        chat.messages.push({ text, chatId, userId })
        chat.save()
        socket.broadcast.emit('message', message)  
        socket.emit('message', message)
      })
    }
  })
})