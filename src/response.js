Response.prototype.sendSuccess = function(res, data){
	var response = {
		success : true
	};

	if( data != null ){
		response.data = data;
	}

	res.send(200, response);
}

Response.prototype.sendError = function(res, message){
	var response = {
		success : false,
		message : message
	};

	res.send(200, response);
}

//----------------------
//      Constructor
//----------------------

function Response() {
}

module.exports = new Response();
