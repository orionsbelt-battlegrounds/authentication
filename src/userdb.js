var mongojs = require("mongojs");
var db = mongojs("mongodb://localhost/obbauthentication", ['users']);

//----------------------
//      Public
//----------------------

UserDB.prototype.add = function(user, callback) {
	db.users.save(user, callback);
}

UserDB.prototype.delete = function(userId, callback) {
	db.users.remove({id : userId }, callback);
}

UserDB.prototype.get = function(userEmail,userPassword, callback) {
	return db.users.findOne(
		{
			email : userEmail,
			password : userPassword,
		}
    );
}

//----------------------
//      Constructor
//----------------------

function UserDB() {
	this.name = "coiso";

}

module.exports = new UserDB();
