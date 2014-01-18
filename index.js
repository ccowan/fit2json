var http        = require('http');
var fs          = require('fs');
var log         = require('./lib/logger');
var postRequest = require('./lib/postRequest');
var getRequest  = require('./lib/getRequest');

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    postRequest(req, res);
  } else {
    getRequest(req, res); 
  }
});

server.listen(3000 || process.env.PORT, function () {
  log.info("Starting Server");
});

