
var restify = require("restify");
var authentication = require("./src/authentication.js");
var response = require("./src/response.js");

var server = restify.createServer({
	name: 'orionsbeltauth',
	version: '0.1.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

function createContext(req, res){
	console.log("creating authentication context");

	return {
		username : req.params.username,
		email : req.params.email,
		password : req.params.password,
		res : res
	}
}

server.post("/login", function (req, res, next) {
	if( req.params == null){
		return response.sendError('No parameters were supplied');
	}

	console.log("Checking invalid username and email");
	if( req.params.username == null && req.params.email == null){
		return response.sendError(res,'Username or email are required');
	}

	console.log("Checking invalid password");
	if( req.params.password == null){
		return response.sendError(res,'Password is required');
	}

	console.log("calling authentication::login");
	authentication.login(
		createContext(req,res)
	);
});

server.post("/create", function (req, res, next) {
	if( req.params == null){
		return response.sendError(res,'No parameters were supplied');
	}

	console.log("calling authentication::create");
	authentication.create(
		createContext(req,res)
	);
});

server.post("/usernameexists", function (req, res, next) {
	if( req.params == null){
		return response.sendError(res,'No parameters were supplied');
	}

	console.log("calling authentication::usernameexists");
	authentication.userNameExists(
		createContext(req,res)
	);
});

server.post("/emailexists", function (req, res, next) {
	if( req.params == null){
		return response.sendError(res,'No parameters were supplied');
	}

	console.log("calling authentication::emailExists");
	authentication.emailExists(
		createContext(req,res)
	);
});

server.listen(3000, function () {
    console.log("Server started @ 3000");
});
