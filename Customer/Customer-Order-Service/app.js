'use strict';

var express = require('express'), 
    app = new express(),
    port = process.env.PORT || 80,
    bodyParser = require('body-parser');
 
// register JSON parser middlewear
app.use(bodyParser.json());
var custOrderRoutes =  require('./routes/customerOrderRoutes');
console.log(custOrderRoutes);
custRoutes(app);

//Start the web server and listen for requests
var server = app.listen(port, function () {
	var host = server.address().address
	var port = server.address().port
	
	console.log("Customer Order service listening at http://%s:%s", host, port)
});
