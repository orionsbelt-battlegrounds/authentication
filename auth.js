
var restify = require("restify");  


var server = restify.createServer({
	name: 'orionsbeltauth',
	version: '0.1.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get("/auth", function (req, res, next) {
    res.send("auth response");
    return next();
});

server.post("/create", function (req, res, next) {
	var user = req.params;
	
    res.send("auth response");
    return next();
});

server.listen(3000, function () {
    console.log("Server started @ 3000");
});