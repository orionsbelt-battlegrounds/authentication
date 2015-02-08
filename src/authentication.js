var restify = require('restify');
var userdb = require('./userdb.js');

function processLoginResult(error, data, context){
  console.log("getByUsername: " + JSON.stringify(data));
  if (data == null) {
    return context.next(new restify.InvalidArgumentError("No data was returned!"));
  }
  if (error != null) {
    return context.next(new restify.InvalidArgumentError(JSON.stringify(error)));
  }
  context.callback({
    id : data._id,
    username : data.username,
    name : data.name,
    email : data.email
  });
}

Authentication.prototype.login = function(context) {
  if( context.username != null) {
    userdb.getByUsername(context.username,context.password,function(error, data){
      processLoginResult(error,data,context);
    });
  }else{
    userdb.getByEmail(context.email,context.password,function(error, data){
      processLoginResult(error,data,context);
    });
  }
}

Authentication.prototype.create = function(context) {
  
}


function Authentication() {
}


module.exports = new Authentication();
