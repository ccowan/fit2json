var convert = require('./convert');
var Busboy  = require('busboy');
var log     = require('./logger');
var convert = require('./convert');


module.exports = function (req, res) {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function (filename, file, encoding, mimetype) {
      var start = new Date();
      var fileLength = 0;
      var resLength = 0;

      file.on('data', function (chunk) {
        fileLength += chunk.length;
      });

      file.pipe(convert())
        .on('data', function (chunk) {
          resLength += chunk.length;
        })
        .on('error', function (err) {
          res.statusCode = 500;
          res.end(err.message);
        })
        .pipe(res)

      res.on('finish', function () {
        var time = (new Date()).getTime() - start.getTime();

        log.info({ 
          req: {
            method: 'POST',
            url: '/',
            remoteAddress: req.headers['x-forward-for'] || req.connection.remoteAddress,
            filename: encoding,
            mimetype: mimetype,
            contentLength: fileLength 
          },
          res: {
            statusCode: res.statusCode,
            responseTime: time,
            contentLength: resLength 
          },
        });

      });

    });
    req.pipe(busboy);


};
