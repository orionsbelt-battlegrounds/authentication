var mongojs = require("mongojs");
var db = mongojs("mongodb://localhost/obbauthentication", ['users']);
var md5 = require('MD5');

//----------------------
//      Public
//----------------------

UserDB.prototype.add = function(user, callback) {
	db.users.save(user, callback);
}

UserDB.prototype.update = function(user, callback) {
	db.users.save(user, callback);
}

UserDB.prototype.delete = function(userId, callback) {
	db.users.remove({_id : userId }, callback);
}

UserDB.prototype.getByEmail = function(userEmail,userPassword, callback) {
	var info = {
		email : userEmail
	};

	if(userPassword != null){
		info.password = md5(userPassword);
	}

	db.users.findOne(info, callback);
}

UserDB.prototype.getByUsername = function(userName,userPassword, callback) {
	var info = {
		username : userName
	};

	if(userPassword != null){
		info.password = md5(userPassword);
	}

	db.users.findOne(info,callback);
}

//----------------------
//      Constructor
//----------------------

function UserDB() {
}

module.exports = new UserDB();
