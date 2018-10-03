//it starts the connection on the client side
//it is a connection which is persistent
 var socket = io();
 //var list = [];
 //registering event on the client side
 //listening to a built-in event
 socket.on('connect',function(){
  console.log('Connected to the server');

  //listening to a custom event
  // socket.on('newEmail',function(email){
  //   console.log('NEW EMAIL:',email);
  // });
  // socket.emit('createEmail',{
  //   to:'jen@abc.com',
  //   text:"hey! what's up"
  // });
 //one-way client<->server communication
 //  socket.emit('createMessage',{
 //    from:'andrew',
 //    text:"hey! what's up all"
 //  });
 //  socket.on('newMessage',function(email){
 //        console.log('NEW EMAIL:',email);
 //  });

 //two-way broadcasting-including client who sends message to all others
 // socket.emit('createMessage',{
 //   from:'andrew',
 //   text:'everything fine?'
 // });
 // socket.on('newMessage',function(message){
 //   console.log('newMessage',message);
 // });
 //one-way broadcasting - excluding the user who sends the message to all others.
 socket.emit('createMessage',{
  from:'andrew',
  text:'everything fine?'
});
socket.on('newMessage',function(message){
  console.log('newMessage',message);
});
  socket.on('welcome',function(message){
    console.log(message);
  });
  socket.emit('joined','Andrew');
  socket.on('joinedu',function(message){
      console.log(message);
  });
 });
 socket.on('disconnect',function(){
   console.log('server disconnected');
 });
