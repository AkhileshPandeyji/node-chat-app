const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var port = process.env.PORT || 3000;
// //old manner
// console.log(__dirname+'/../public');
// //new approach
var dpath = path.join(__dirname,'/../public');
// console.log(dpath);
//in order to incorporate the web sockets we have to turn the
//express server to the in built http -server and integrate express with
//the http server.
var app = express();
var server = http.createServer(app);

//to convert the http server to the web socket server we use socketIO(http server)
var io = socketIO(server);
//registering event on the server side- on('event-builtin/custom',
//(socket)=>{called when the event is listened})
// on io
//'connection'-listens to any live connection
io.on('connection',(socket)=>{
  console.log('New user connected');
  socket.on('disconnect',()=>{
    console.log('User disconnected');
  });
});

app.use(express.static(dpath));


server.listen(port,()=>{
  console.log('Server is up and running on port 3000');
});
