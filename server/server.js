var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var cors = require('cors');
var dbUtils = require('./db/db');

dbUtils.connect((err) => {
  app.use(cors());

  var db = dbUtils.getDb();

  io.on('connection', (client) => {
    client.on('subscribeToMessages', subscription => {
      try {
        dbUtils.addActiveUser(db, subscription.user).then(user => console.log(user));
      } catch (err) {
        console.log(err);
      }
      setInterval(() => {
        try {
          dbUtils.getActiveUsers(db, (err, users) => {
            client.emit('activeUsers', users);
            var usernames = users.map(user => {
              return user.user
            })
            dbUtils.getConversation(db, usernames, (err, messages) => {
              console.log(messages)
              client.emit('receiveMessages', messages);
            });
          });
        } catch (err) {
          console.log(err);
        }
      }, subscription.interval);
    });

    client.on('sendMessage', message => {
      try {
        db.collection('messages').insertOne({author: message.author, users: message.users, message: message.text});
      } catch (err) {
        console.log('error inserting document into mongo');
      }
    })

    client.on('close', username => {
      try {
        dbUtils.removeActiveUser(db, username).then(user => console.log(user));
      } catch (err) {
        console.log(err);
      }
    })
  });
  server.listen(5000);
});
