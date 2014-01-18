var http = require('http');
var fs   = require('fs');
var log  = require('./logger');

module.exports = function (req, res) {
  var start = new Date();
  var index = fs.createReadStream(__dirname+'/../index.html');
  index.pipe(res);
  res.on('finish', function () {
    var time = (new Date()).getTime() - start.getTime();
    log.info({ 
      req: {
        method: 'GET',
        url: '/',
        remoteAddress: req.headers['x-forward-for'] || req.connection.remoteAddress || '-',
      },
      res: {
        statusCode: res.statusCode,
        responseTime: time
      },
    });
  });
}

