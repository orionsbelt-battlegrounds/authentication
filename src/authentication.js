var restify = require('restify');
var userdb = require('./userdb.js');
var response = require('./response.js');

function processLoginResult(error, data, context){
  if (data == null) {
    return response.sendError(context.res,"No data was returned!");
  }
  if (error != null) {
    return response.sendError(JSON.stringify(error));
  }

  var data = {
    id : data._id,
    username : data.username,
    name : data.name,
    email : data.email
  };

  response.sendSuccess(context.res,data);
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
  var user = {
    email : context.email,
    password : context.password,
    name : context.name,
    username : context.username
  };
  userdb.add(user, function(err, data){
    response.sendSuccess(context.res);
  });
}

Authentication.prototype.userNameExists = function(context) {
  userdb.getByUsername(context.username, null, function(err, data){
    response.sendSuccess(
      context.res,
      { exists : data != null }
    );
  });
}

Authentication.prototype.emailExists = function(context) {
  userdb.getByEmail(context.email, null, function(err, data){
    response.sendSuccess(
      context.res,
      { exists : data != null }
    );
  });
}


function Authentication() {
}


module.exports = new Authentication();
