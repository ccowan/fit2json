var bunyan = require('bunyan');
var colors = require('ansicolors');
var Writable = require('stream').Writable;
var util = require('util');

var levels = {
  10: 'trace',
  20: 'debug',
  30: 'info',
  40: 'warn',
  50: 'error',
  60: 'fatal'
};

var levelColor = {
  10: 'blue',
  20: 'green',
  30: 'cyan',
  40: 'yellow',
  50: 'red',
  60: 'magenta'
  

}

var statusColor = function (code) {
  if (code < 299) return colors.green(code);
  if (code < 399) return colors.yellow(code);
  if (code < 499) return colors.magenta(code);
  return colors.red(code);
};

function StdoutStream (options) {
  Writable.call(this, options);
}

util.inherits(StdoutStream, Writable);

StdoutStream.prototype._write = function StdoutWrite(entry, encoding, callback) {
  entry = JSON.parse(entry.toString('utf8'));

  var crayon = colors[levelColor[entry.level]];

  var output = ' [ ';
  output += crayon(levels[entry.level].toUpperCase());
  output += ' ] ';
  output += colors.brightBlack(entry.time);
  output += ' ';

  if (entry.req && entry.res) {
    output += util.format('%s %s %s ', entry.req.remoteAddress, entry.req.method, entry.req.url);
    output += statusColor(entry.res.statusCode);
    if (entry.req.method === 'POST') {
      output += colors.brightBlack(util.format(
        ' %s (%s) %dms - %d bytes -> %d bytes',
        entry.req.filename,
        entry.req.mimetype,
        entry.res.responseTime,
        entry.req.contentLength,
        entry.res.contentLength
      ));
    } else {
      output += colors.brightBlack(util.format(' %dms', entry.res.responseTime));
    }
  } else if (entry.msg) {
    output += entry.msg;
  }

  console.log(output);
  if (entry.err) {
    console.log(colors.brightRed(entry.err.stack));
  }
  callback();
};

module.exports = StdoutStream;

