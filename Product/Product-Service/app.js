'use strict';

var express = require('express'), 
    app = new express(),
    port = process.env.PORT || 80,
    bodyParser = require('body-parser');
 
// register JSON parser middlewear
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

var prodRoutes =  require('./routes/productRoutes');
console.log(prodRoutes);
prodRoutes(app);
 
//Start the web server and listen for requests
var server = app.listen(port, function () {
	var host = server.host
	var port = server.port
	
	console.log("Product service listening at http://%s:%s", host, port)
});