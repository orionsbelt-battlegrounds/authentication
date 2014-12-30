
var _ = require('underscore');
var expect = require("expect.js");
var md5 = require('MD5');
var userdb = require("./../src/userdb.js");

describe('userdbTests', function() {
	it('create user', function(done) {
    	var testUser = {
    		email : "nunos@zi-yu.com",
    		password : md5("password"),
    		name : "Nuno Silva",
    		username : "nunos"
    	};
    	userdb.add(testUser, function(err, data){
	      //console.log("Add result:" + data);
	      userdb.get("nunos@zi-yu.com", md5("password"), function(err, data){
	          //console.log("Get result" + data);
						//data.email.should.equal('nunos@zi-yu.com');
						done();
	      });
    	});
  	})
});
