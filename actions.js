var token = require('./access-token.js').token;
var request = require('request');
var PAGE_ID = '1554039508189783';

module.exports = {
  setWelcomeScreen: function(){
    request({
      url: `https://graph.facebook.com/v2.6/${PAGE_ID}/thread_settings?access_token=${token}`,
      method: 'POST',
      qs: {
        'setting_type': 'call_to_actions',
        'thread_state': 'new_thread',
        'call_to_actions': [
          {
            'message': {
              'text': 'Welcome to the Miramar Business Club\'s Page! Send us a message to learn more about what we do.'
            }
          }
        ]
      }
    }, function(err, response, body){
      if (err) console.log(err);
      console.log('got a resonse, after setting welcome message');
      console.log(JSON.stringify(body));
    })
  },
  sendTextMessage: function (sender, text) {
    messageData = {
      text:text
    }
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: messageData,
      }
    }, function(error, response, body) {

      console.log('messeage should be sent');

      if (error) {
        console.log('Error sending message: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      }
    });
  },
  sendButtons: function (sender) {
    var message = {
      'attachment': {
        'type':'template',
        'payload':{
          'template_type': 'button',
          'text': 'See what we have planned',
          'buttons': [
            {
              'type': 'web_url',
              'title': 'View Agenda',
              'url': 'https://docs.google.com/a/miramarsd.net/viewer?a=v&pid=sites&srcid=bWlyYW1hcnNkLm5ldHxidXNpbmVzc2NsdWJ8Z3g6NGQwZDZlNDdmNjQ3YmI2Ng'
            },
            {
              'type': 'postback',
              'title': 'RSVP',
              'payload': 'MEETING_RSVP'
            }
          ]
        }
      }
    }
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: message,
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending message: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      }
    });
  },
  getProfileInfo: function(sender, resolve, reject){
    request({
      url: 'https://graph.facebook.com/v2.6/'+sender+'?fields=first_name,last_name,profile_pic',
      qs: {access_token:token},
      method: 'GET',
    }, function(err, response, body){
      if (err) console.log(err);
      const profile = JSON.parse(body);
      resolve({id: sender, profile: profile});
    }.bind(this));
  },
  sendGenericMessage: function(sender) {
    messageData = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "First card",
            "subtitle": "Element #1 of an hscroll",
            "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
            "buttons": [{
              "type": "web_url",
              "url": "https://www.messenger.com/",
              "title": "Web url"
            }, {
              "type": "postback",
              "title": "Postback",
              "payload": "Payload for first element in a generic bubble",
            }],
          },{
            "title": "Second card",
            "subtitle": "Element #2 of an hscroll",
            "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
            "buttons": [{
              "type": "postback",
              "title": "Postback",
              "payload": "Payload for second element in a generic bubble",
            }],
          }]
        }
      }
    };
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:token},
      method: 'POST',
      json: {
        recipient: {id:sender},
        message: messageData,
      }
    }, function(error, response, body) {
      if (error) {
        console.log('Error sending message: ', error);
      } else if (response.body.error) {
        console.log('Error: ', response.body.error);
      }
    });
  }
}
