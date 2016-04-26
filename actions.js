var token = require('./access-token.js').token;
var request = require('request');

module.exports = {

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
          'text': 'What time do you want the next meeting at?',
          'buttons': [
            {
              'type': 'postback',
              'title': '10:00 am',
              'payload': '12am'
            },
            {
              'type': 'postback',
              'title': '12:00 Noon',
              'payload': '12am'
            },
            {
              'type': 'postback',
              'title': 'start chatting',
              'payload': 'USER_DEFINED_PAYLOAD'
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

  getProfileInfo: function(sender){
    request({
      url: 'https://graph.facebook.com/v2.6/'+sender+'?fields=first_name,last_name,profile_pic',
      qs: {access_token:token},
      method: 'GET',
    }, function(err, res, bod){
      const profile = JSON.parse(bod);
      this.sendTextMessage(sender, 'Hey '+ profile.first_name)
      if (err) console.log(err);
    }.bind(this))
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
