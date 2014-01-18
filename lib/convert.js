var child    = require("child_process");
var through2 = require('through2');
var domain   = require('domain');
var log      = require('./logger');

var handleError = function (err) {
  this.emit('error', new Error("Failed to process file.")); 
};

var pushData = function (data) {
  this.push(data.toString("utf8"));
};

var run = function (chunk, enc, done) {
  var fit2json = child.spawn('/usr/bin/java', ['-jar', __dirname + "/FitToJson2.jar"]);
  fit2json.stdin.write(chunk, 'base64');
  fit2json.stdout.on("data", pushData.bind(this));
  fit2json.on("exit", done);
};

module.exports = function (options) {
  return through2(function (chunk, enc, done) {
    var d = domain.create();
    d.on('error', handleError.bind(this));
    d.run(run.bind(this, chunk, enc, done));
  });
};
