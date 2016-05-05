# Messengerbot
It interacts with people through Facebook's Messenger platform. Individuals can open a chat with the page to interact with the bot.  

### Steps for running the bot

These directions require that ngrock is installed and added to the PATH variable. Also, nodemon must be installed (in my case it's installed globally). Feel free to install it locally if you prefer. If that is the case, you must install it specifically via npm. ```npm install nodemon```


1. Start ngrok 
    ```sh
    ngrok http 3040
    ```

2. Move into project directory and start app
    ```sh
    npm run dev
    ```

3. Copy the https url that ngrok generates with the /webhook route at the end.</br>
   Every time a new url is generated you must copy it and register it in the apps facebook dashboard. Once in the app dashboard navigate to messenger > webhooks. The url should look similar to the one below: </br>
  
    ````
    https:34reb62es.ngok.io/webhook
    ````
