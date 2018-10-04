var generateMessage = function(from,text){
  return {
    from,
    text,
    createdAt:new Date().toString()
  };
};
var generateLocMessage = function(from,latitude,longitude){
  return {
    from,
    url : `https://www.google.com/maps/?q=${latitude},${longitude}`,
    createdAt : new Date().getTime()
  };
};
module.exports={
  generateMessage,
  generateLocMessage
};
