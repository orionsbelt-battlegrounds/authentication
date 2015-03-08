var jwt = require('jwt-simple');
var md5 = require('MD5');
var authentication = require("../src/authentication.js");
var app = require('../src/app.js');
var userdb = require("./../src/userdb.js");

describe('authenticationTests', function() {
  it('login jwt test', function(done) {
    var testUser = {
      email : "authtest",
      password : md5("authtest"),
      name : "auth",
      username : "authtest"
    };

    userdb.add(testUser, function(err, data){
      var context = {
        username : "authtest",
        email : "authtest@somewhere.com",
        password : "authtest",
        res : {
          send : function(code, result) {
            code.should.equal(200);
            var decoded = jwt.decode(result.data.token, app.token);
            decoded.iss.should.equal(testUser._id.toString());
          }
        }
      };

      authentication.login( context );

      userdb.delete(testUser._id, function(err, data){
        done();
      });
    });
  })
});
