'use strict'

var SocketSingleton = require('./singleton/socket-singletion');
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require('http');
var path = require('path');
var server = http.createServer(app);
SocketSingleton.configure(server); // <--here
server.listen(process.env.PORT || 3000);
var webpay_routes = require("./routes/webpay.route");


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
  	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});


app.use("/api/v1", webpay_routes);

app.use(express.static(__dirname + '../../dist/webpay'));

// Send all requests to index.html
app.get('/*', function(req, res) {
	if (req.url === '/api/v1*') return next();
  	res.sendFile(path.join(__dirname + '../../dist/webpay/index.html'));
});

module.exports = app;