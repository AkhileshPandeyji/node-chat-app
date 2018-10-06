//the first approach
// var users = [{
//   // id:'fcxgxgthxhh',
//   // name:'Andrew',
//   // room:'The office fans'
// }];
//
// var addUsers = function(id,name,room){
//   users.push({
//   id:id,
//   name:name,
//   room:room
//   });
// };

//addUSer(id,name,room);
//removeUser(id);
//getUser(id);
//getUsersList(room);

//the second approach
class Users{
  constructor(){
    this.users = [];
  }
  addUser(id,name,room){
    var users = {id,name,room};
    this.users.push(users);
    return users;
  }
  removeUser(id){
    var remUser = this.users.filter(function(user){
      return user.id == id;
    })[0];
    if(remUser){
    this.users = this.users.filter(function(user){
      return user.id != id;
    });
  }
    return remUser;
  }
  getUser(id){
    var user = this.users.filter(function(user){
      return user.id == id;
    })[0];
    return user;
  }
  getUsersList(room){
  var users = this.users.filter(function(user){
    return user.room == room;
  });
  var namesArray = users.map(function(user){
    return user.name;
  });
  return namesArray;
  }
}
module.exports = {Users};
// var user = new Users();
// console.log(user.addUser('1','Andrew','The Office Fans'));
// console.log(user.users);
// console.log(user.removeUser('99'));
// console.log(user.users);
// console.log(user.addUser('1','Andrew','The Office Fans'));
// console.log(user.addUser('2','Ana','The Office Heros'));
// console.log(user.users);
// console.log(user.getUser('99'));
// console.log(user.getUsersList('The Office Fans'));
// console.log(user.getUsersList('The Office Heros'));
