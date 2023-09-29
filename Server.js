const express = require('express');
const http = require('http');
const dgram = require('dgram');
const socketIO = require('socket.io');

const app = express();
const httpServer = http.createServer(app);

const server = new socketIO.Server(httpServer, {
    cors:{
      origin:'*'
    }
  })


// UDP server to receive data     
const udpServer = dgram.createSocket('udp4');

const PORT = 1999; // Replace with your desired port number

udpServer.on('message', (message, remote) => {
  const data = message.toString();
    // send it to the react three fiber
  server.emit('udpData', data);
});

udpServer.bind(PORT);

// server connection handling
server.on('connection', (socket) => {
  console.log('Client connected');
}); 

httpServer.listen(3001, () => {
  console.log('Server is running on port 3001');
});
