var http        = require('http');
var fs          = require('fs');
var log         = require('./lib/logger');
var postRequest = require('./lib/postRequest');
var getRequest  = require('./lib/getRequest');
var port        = process.env.PORT || 3000;

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    postRequest(req, res);
  } else {
    getRequest(req, res); 
  }
});

server.listen(port, function () {
  log.info("Starting Server on port %d", port);
});

