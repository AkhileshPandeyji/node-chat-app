var moment = require('moment');
var generateMessage = function(from,text){
  return {
    from,
    text,
    createdAt:moment().valueOf()
  };
};
var generateLocMessage = function(from,latitude,longitude){
  return {
    from,
    url : `https://www.google.com/maps/?q=${latitude},${longitude}`,
    createdAt : moment().valueOf()
  };
};
var isRealString = function(text){
  if(typeof text =='string' && text.trim().length !=0){
    return true;
  }
  else{
    return false;
  }
};
module.exports={
  generateMessage,
  generateLocMessage,
  isRealString
};
