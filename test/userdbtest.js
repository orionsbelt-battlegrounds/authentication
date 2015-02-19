
var _ = require('underscore');
var expect = require("expect.js");
var md5 = require('MD5');
var userdb = require("./../src/userdb.js");

describe('userdbTests', function() {
	it('create and get user by email test', function(done) {
    	var testUser = {
    		email : "nunos@zi-yu.com",
    		password : md5("password"),
    		name : "Nuno Silva",
    		username : "nunos"
    	};
    	userdb.add(testUser, function(err, data){
	      userdb.getByEmail("nunos@zi-yu.com", "password", function(err, data){
						data.email.should.equal("nunos@zi-yu.com");
						data.password.should.equal(md5("password"));
						data.name.should.equal("Nuno Silva");
						data.username.should.equal("nunos");

						userdb.delete(data._id, function(err, data){
								done();
						});
	      });
    	});
  	}),

		it('create and get user by email test (no password)', function(done) {
			var testUser = {
				email : "nunos@zi-yu.com",
				password : md5("password"),
				name : "Nuno Silva",
				username : "nunos"
			};
			userdb.add(testUser, function(err, data){
				userdb.getByEmail("nunos@zi-yu.com", null, function(err, data){
					data.email.should.equal("nunos@zi-yu.com");
					data.password.should.equal(md5("password"));
					data.name.should.equal("Nuno Silva");
					data.username.should.equal("nunos");

					userdb.delete(data._id, function(err, data){
						done();
					});
				});
			});
		}),

		it('create and get user by username test', function(done) {
			var testUser = {
				email : "nunos@zi-yu.com",
				password : md5("password"),
				name : "Nuno Silva",
				username : "nunos"
			};
			userdb.add(testUser, function(err, data){
				userdb.getByUsername("nunos", "password", function(err, data){
					data.email.should.equal("nunos@zi-yu.com");
					data.password.should.equal(md5("password"));
					data.name.should.equal("Nuno Silva");
					data.username.should.equal("nunos");

					userdb.delete(data._id, function(err, data){
						done();
					});
				});
			});
		}),

		it('create and get user by username test (no password)', function(done) {
			var testUser = {
				email : "nunos@zi-yu.com",
				password : md5("password"),
				name : "Nuno Silva",
				username : "nunos"
			};
			userdb.add(testUser, function(err, data){
				userdb.getByUsername("nunos", null, function(err, data){
					data.email.should.equal("nunos@zi-yu.com");
					data.password.should.equal(md5("password"));
					data.name.should.equal("Nuno Silva");
					data.username.should.equal("nunos");

					userdb.delete(data._id, function(err, data){
						done();
					});
				});
			});
		}),

		it('update user by email test', function(done) {
			var testUser = {
				email : "nunos@zi-yu.com",
				password : md5("password"),
				name : "Nuno Silva",
				username : "nunos"
			};
			userdb.add(testUser, function(err, data){
				userdb.getByEmail("nunos@zi-yu.com", "password", function(err, data){
					data.email = "nuno.silva@ninjafrog.net";
					data.username = "Nuno André Silva";
					userdb.update(data, function(err,data){
						userdb.getByEmail("nuno.silva@ninjafrog.net", "password", function(err, data){
							data.email.should.equal("nuno.silva@ninjafrog.net");
							data.username.should.equal("Nuno André Silva");
							userdb.delete(data._id, function(err, data){
								done();
							});
						});
					})
				});
			});
		}),

		it('update user by email test', function(done) {
			var testUser = {
				email : "nunos@zi-yu.com",
				password : md5("password"),
				name : "Nuno Silva",
				username : "nunos"
			};
			userdb.add(testUser, function(err, data){
				done();
			});
		})
});
