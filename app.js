var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
// godaddy provides an intermediate file with multiple certs so we have to seperate them and place them into an array as individual strings.
var gd1 = fs.readFileSync('/home/terrell/gd1.pem', 'utf8');
var gd2 = fs.readFileSync('/home/terrell/gd2.pem', 'utf8');
var gd3 = fs.readFileSync('/home/terrell/gd3.pem', 'utf8');
var options = {
        key: fs.readFileSync('/home/terrell/terrellvest.com.key'),
        cert: fs.readFileSync('/home/terrell/terrellvest.com.crt'),
        ca:[gd1, gd2, gd3]
};


app.use(bodyParser.json());

app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === 'secret') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');
  }
});

app.get('/', function(req, res){
        res.send('Hello World!');
});

app.post('/webhook', function (req, res) {
  messaging_events = req.body.entry[0].messaging;
  for (i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;
    if (event.message && event.message.text) {
      text = event.message.text;
        console.log('text: ', text);
      // Handle a text message from this sender
    }
  }
  res.sendStatus(200);
});


var server = https.createServer(options, app).listen(3040, function(){
        console.log('express server listening on port 3040');
});
