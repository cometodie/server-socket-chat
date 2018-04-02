// const mongoose = require('mongoose');

// // module.exports = http => {
//     //   const io = require('socket.io')(http);
//     //   return {
//         //     databaseStore,
//         //     databaseGetMessages
//         //   };
//         // };
//         const Message = require('../models/message.model');
        
// function databaseStore(msg, timeStamp) {
//   const message = new Message({
//     text: msg,
//     date: timeStamp
//   });
//   message.save().then(err => {
//     if (err) return res.send(err);
//   });
// }

// function databaseGetMessages() {
//   Message.find({}, (err, results) => {
//     if (results) {
//       console.log(results);
//       results = results.map(el => {
//         el.type = 'all-messages';
//         el.date = new Date(el.date).getTime();
//         return el;
//       });
//       io.emit('all-messages', results);
//     }
//     if (err) {
//       console.log(err);
//     }
//   });
// }
