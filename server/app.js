const express = require('express');
const app = express();
const http = require('http').createServer();
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:8080",
  }
});

let users = [];

io.on('connection', socket => {

    socket.on('user login', (username) => {
        io.emit('message lobby', username + ' has connected!');

        users.push(username);
        socket.userid = users.length - 1;
        io.emit('user list', users);
    });

    socket.on('message lobby', message => {
        io.emit('message lobby', message);
    });

    socket.on('disconnect', () => {
        if(typeof socket.userid !== 'undefined') {
            io.emit('message lobby', users[socket.userid] + ' has disconnected!');

            users.splice(socket.userid, 1);
            io.emit('user list', users);
        }
    });
});

http.listen(3000, () => {});

