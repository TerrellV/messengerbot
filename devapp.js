var https = require('https');
var fs = require('fs');
var request = require('request');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'secret') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});

app.get('/', function(req, res){
  res.send('Hello World! Nothing to see here... move along.');
});

app.post('/webhook', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    senderID = event.sender.id;
    if (event.message && event.message.text) {
      messageText = event.message.text;
      console.log(senderID, messageText);
      // Handle a text message from this sender
    }
  }
  res.sendStatus(200);
});


app.listen(3040, function(err){
  console.log('express dev server running');
})
