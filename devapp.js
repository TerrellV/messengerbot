var https = require('https');
var fs = require('fs');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes.js');
var actions = require('./actions.js');
var app = express();

app.use(bodyParser.json());

routes(app, actions);

app.listen(3040, function(err){
  console.log('express dev server running');
})
