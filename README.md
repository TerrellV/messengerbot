# messengerbot
Messenger bot for facebook page

### Steps for running the bot

These steps are going to make the assumption that your local server is running on port 3020. You should change this number depending on the port your local server is running. 

provided ngrok is installed and added to the PATH variable and nodemon is installed globally

1. Start ngrok </br>
`ngrok http 3040`

2. Start local app </br>
`nodemon devapp.js`

3. Copy and paste the url with the /webhook path in required field on facebook's app dashboard </br>
  **Example Domain:** https:34reb62es.ngok.io/webhook
