var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 8080;
var users = [];//store array of user


app.use(express.static(path.join(__dirname, "public")));

io.on('connection', function(socket) {
  console.log('socket.io conencted!');

  // Join private room
  socket.on('join-private', function(data) {
    socket.join('private');
    console.log(data.nickname + ' joined private');
  });

  socket.on('private-chat', function(data) {
    socket.broadcast.to('private').emit('show-message', data.message);
  });

  // Show all users when first logged on
  socket.on('get-users', function(data) {//get-users
    socket.emit('all-users', users);
  });

  // When new socket JOIN
  socket.on('join', function(data) {//join event
    socket.nickname = data.nickname;
    users[socket.nickname] = socket; //set socket
      //user object
    var userObj = {
      nickname: data.nickname,
      socketid: socket.id
    }
    users.push(userObj);//add user object to array of users
    io.emit('all-users', users);//emit the event
  });

  // Send a message
  socket.on('send-message', function(data) {//sendmessages event
    // socket.broadcast.emit('message-received', data);-- send to all the socket
    io.emit('message-received', data);
  });

  // Send a 'like' to the user of your choice
  socket.on('send-like', function(data) {
    console.log(data);
    console.log(data.like);
    console.log(data.from);
    socket.broadcast.to(data.like).emit('user-liked', data);
  });

  socket.on('disconnect', function() {
    users = users.filter(function(item) {
      return item.nickname !== socket.nickname;
    });
    io.emit('all-users', users);
  });

});

server.listen(port, function() {
  console.log("Listening on port " + port);
});
