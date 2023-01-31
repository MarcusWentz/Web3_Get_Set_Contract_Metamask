// Importing the required modules
const WebSocketClient = require('ws');
const ws = new WebSocketClient("ws://localhost:8081");

ws.addEventListener("open", () =>{
  console.log("We are connected");
  ws.send("I am a client listening to you.");
});

ws.addEventListener('message', function (event) {
    console.log(event.data);
});
