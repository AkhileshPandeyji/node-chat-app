const path = require('path');
const express = require('express');
var port = process.env.PORT || 3000;
// //old manner
// console.log(__dirname+'/../public');
// //new approach
var dpath = path.join(__dirname,'/../public');
// console.log(dpath);

var app = express();
app.use(express.static(dpath));


app.listen(port,()=>{
  console.log('Server is up and running on port 3000');
});
