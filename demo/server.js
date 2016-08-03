// server.js
var express = require('express');
var tinylr  = require('tiny-lr');
var app = module.exports.app = exports.app = express();

app.use(express.static(__dirname));
app.listen(9999, 'localhost');


//you won't need 'connect-livereload' if you have livereload plugin for your browser
app.use(require('connect-livereload')());
