//it starts the connection on the client side
//it is a connection which is persistent
 var socket = io();
 //var list = [];
 //registering event on the client side
 //listening to a built-in event
 socket.on('connect',function(){
  console.log('Connected to the server');
  socket.emit('validate',jQuery.deparam(window.location.search),function(err){
    if(err){
    window.location.href ='/';
    return alert(err);
      }
      }
);
 });
  function scrollBottom(){
    var messages = jQuery('#list');
    var newMessage = messages.children('li:last-child');
    var lastMessage = newMessage.prev();
    var scrollHeight = messages.prop('scrollHeight');
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = lastMessage.innerHeight();
    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight)
    {
      messages.scrollTop(scrollHeight);
    }
  };
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
 socket.on('updateUserList',function(users){
   if(users){
   // console.log(user);
      var ol = jQuery('<ol></ol>');
   users.forEach(function(user){
       var li = jQuery('<li></li>').text(user);
       ol.append(li);

        });
      jQuery('#users').html(ol);
    }
 });
 socket.on('newMessage',function(message){
   var formattedTime = moment(message.createdAt).format('h:mm a');
   var template = jQuery('#message-template').html();
   var html = Mustache.render(template,{
     from: message.from,
     text: message.text,
     time: formattedTime
   });
   jQuery('#list').append(html);
   scrollBottom();
   // var li = jQuery('<li></li>');
   // li.text(`${message.from}:${moment(message.createdAt).format('h:mm a')} : ${message.text}.---${moment(message.createdAt).fromNow()}`);
   // jQuery('#list').append(li);
 });
 jQuery("#message-form").on("submit",function (event){
   event.preventDefault();
    socket.emit('createMessage',{
    text:jQuery('[name=message]').val()
  });
  jQuery('[name=message]').val('');
});

  // socket.on('welcome',function(message){
  //   console.log(message);
  // });
  // socket.emit('joined','Andrew');
 //  socket.on('joinedu',function(message){
 //      console.log(message);
 //  });
 // });
 //the geolocation is inherently stored inside the
 //navigator.geolocation object
 //we use navigator.geolocation.getCurrentPosition()
 //we can also use navigator.geolocation.watchPosition()
 var locbutton = jQuery('#send-location');
 locbutton.on('click',function(e){
   if(!navigator.geolocation){
     return alert('Geolocation not supported by the browser');
   }
   locbutton.attr('disabled','disabled');
   locbutton.text('sending...');
   navigator.geolocation.getCurrentPosition(function(position){
     console.log(position);

     socket.emit('location',{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
     });
locbutton.removeAttr('disabled').text('send location');

   },function(){
      locbutton.removeAttr('disabled').text('send location');
      return alert('Unable to fetch the location');
   })
 });
 socket.on('newlocmessage',function(message){
   var formattedTime = moment(message.createdAt).format('h:mm a');
   var template = jQuery('#location-message-template').html();
   var html = Mustache.render(template,{
     from: message.from,
     url: message.url,
     time: formattedTime
   });
   jQuery('#list').append(html);
   scrollBottom();
   // var li = jQuery('<li></li>');
   // var a = jQuery('<a target="_blank">My current Location</a>');
   // a.attr('href',message.url);
   // li.text(message.from+':'+`${moment(message.createdAt).format('h:mm a')}:`)
   // li.append(a);
   // jQuery('#list').append(li);
 });
 socket.on('disconnect',function(){
   console.log('server disconnected');
 });
