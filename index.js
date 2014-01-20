var http        = require('http');
var fs          = require('fs');
var log         = require('./lib/logger');
var postRequest = require('./lib/postRequest');
var getRequest  = require('./lib/getRequest');
var port        = process.env.PORT || 3000;
var bindAddress = process.env.BIND_ADDRESS || '127.0.0.1'

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    postRequest(req, res);
  } else {
    getRequest(req, res); 
  }
});

server.listen(port, bindAddress, function () {
  log.info("Starting Server on http://%s:%d", bindAddress, port);
});

