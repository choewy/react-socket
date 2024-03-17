const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log(`connected : ${socket.id}`);

  socket.on('message', (message) => {
    socket.emit('message', `${message}:ack`);
  });

  socket.on('disconnect', () => {
    console.log(`disconnected : ${socket.id}`);
  });
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});
