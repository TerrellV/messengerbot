module.exports = function(app, actions){
  // root
  app.get('/', function(req, res){
    res.send('Hello World! Nothing to see here... move along.');
  });

  // facebook webhooks
  app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'secret') {
      res.send(req.query['hub.challenge']);
    } else {
      res.send('Error, wrong validation token');
    }
  });

  app.post('/webhook', function (req, res) {
    messaging_events = req.body.entry[0].messaging;
    for (i = 0; i < messaging_events.length; i++) {
      event = req.body.entry[0].messaging[i];
      console.log('message received');
      if (event.postback){
        if(event.postback.payload === 'USER_DEFINED_PAYLOAD'){
          actions.sendTextMessage(senderID, 'please give us a time. Example formats. 1 pm 2:15 am');
        }
      }


      senderID = event.sender.id;
      if (event.message && event.message.text) {
        messageText = event.message.text.toLowerCase();

        if(messageText === 'profile'){
          actions.getProfileInfo(senderID);
        }

        if (messageText === 'what are my options'){
          actions.sendButtons(senderID);
          break;
        }

        if (messageText === 'generic'){
          actions.sendGenericMessage(senderID);
        }

        if(messageText === 'next meeting'){
          actions.sendTextMessage(
            senderID,
            'The business Club\'s next meeting is May 6th from 12:00 to 1:00');
        }
      }
    }
    res.sendStatus(200);
  });
}
