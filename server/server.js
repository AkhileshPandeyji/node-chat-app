const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocMessage,isRealString} = require('./../util/utils.js');
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
app.use(express.static(dpath));

//registering event on the server side- on('event-builtin/custom',
//(socket)=>{called when the event is listened})
// on io
//'connection'-listens to any live connection
//we will always write the socket.emit() and socket.on() inside io.on()
io.on('connection',(socket)=>{
  console.log('New user connected');

  //custom event newEmail emitted from Server to the client
  // socket.emit('newEmail',{
  //   from:'andrew@abc.com',
  //   text:'hi there!',
  //   createdAt:new Date().getTime()
  // });
  // socket.on('createEmail',function(email){
  //   console.log('CREATE EMAIL:',email);
  // });
  //one way client<->server communication
  // socket.on('createMessage',function(message){
  //     console.log(message);
  //     socket.emit('newMessage',message);
  // });
  //two way broadcast including the one who sends the message to all others.
  // socket.on('createMessage',(message)=>{
  //   io.emit('newMessage',message);
  // });
  //one way broadcast excluding the one who sends the message to all others.
  // socket.on('createMessage',(message)=>{
  //   socket.broadcast.emit('newMessage',message);
  // });
  //in order to declare chat rooms we have socket.join()
  //in order to emit events only to the room mates or users
  //we use the folllowing syntaxes:
  //io.to('room name').emit();
  //socket.broadcast.to('room name').emit();
  //socket.to('room name').emit();

  socket.on('validate',function(user,callback){
    if(!isRealString(user.display)&& !isRealString(user.room)){
      callback('The entered input is not a valid string text');
      }
      else{
        socket.join(user.room);
        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat!'));
        socket.broadcast.to(user.room).emit('newMessage',generateMessage('Admin',`${user.display} has joined.`));
        callback();
      }
  });
  socket.on('createMessage',(message)=>{
    io.emit('newMessage',message);
      });
  socket.on('location',function(coords){
    io.emit('newlocmessage',generateLocMessage('User',coords.latitude,coords.longitude));
      });
  socket.on('disconnect',()=>{
    console.log('User disconnected');
  });
});
server.listen(port,()=>{
  console.log('Server is up and running on port 3000');
});
