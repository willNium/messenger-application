# messenger application
simple messaging app built with react, express, and mongo

## Clonining the App
 - ```git clone https://github.com/willNium/messenger-application.git```

## Running the app
 - Requires mongo to be installed and running on the local machine (my local version is 3.2.1).
 - To install dependencies:
   - ```cd messenger-application```
   - ```npm install```
   - ```cd server && npm install && cd ..```
 - To start the app
   - ```yarn start```
   - Open a second terminal and run ```cd server && npm run start```
   - Visit http://localhost:3000 and start using the app
    - recommend opening a new tab for each user that you want to join the conversation
    - click 'exit conversation' to leave
    - the conversation contents should change based on who is logged in


#### bugs
 - "session manangement" - if users are lingering to the right of the chat window it's probably best to close all tabs and drop the `messages` and `activeUsers` collections in mongo and start fresh
