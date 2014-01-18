var bunyan       = require('bunyan');
var StdoutStream = require('./stdoutStream');
var stdout       = new StdoutStream();

module.exports = bunyan.createLogger({
  name: 'fit2json',
  streams: [
    { stream: stdout }
  ]
});


