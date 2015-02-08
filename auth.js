
var restify = require("restify");
var authentication = require("./src/authentication.js");

var server = restify.createServer({
	name: 'orionsbeltauth',
	version: '0.1.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

function buildError(next, message){
	return next(new restify.InvalidArgumentError(message));
}

function createContext(req, res, next){
	console.log("creating authentication context");

	return {
		username : req.params.username,
		email : req.params.email,
		password : req.params.password,
		next : next,
		callback : function(user){
			res.send(200, user)
		}
	}
}

server.post("/login", function (req, res, next) {
	if( req.params == null){
		return buildError(next,'No parameters were supplied');
	}

	console.log("Checking invalid username and email");
	if( req.params.username == null && req.params.email == null){
		return buildError(next,'Username or email are required');
	}

	console.log("Checking invalid password");
	if( req.params.password == null){
		return buildError(next,'Password is required');
	}

	console.log("calling authentication::login");
	authentication.login(
		createContext(req,res,next)
	);
});

server.post("/create", function (req, res, next) {
	if( req.params == null){
		return buildError(next,'No parameters were supplied');
	}

	console.log("calling authentication::create");
	authentication.create(
		createContext(req,res,next)
	);
});

server.listen(3000, function () {
    console.log("Server started @ 3000");
});
