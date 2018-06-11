# messenger application
simple messaging app that was built around conversations
 - all messages between each combination of users are saved

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
    - recommend opening multiple tabs to chat with multiple parties
    - notice the conversation contents change based on who is logged in
