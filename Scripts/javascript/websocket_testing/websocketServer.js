// Importing the required modules
const WebSocketServer = require('ws');

// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8081 })

const timeMilliSec = 1000;

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}

// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected");
    // sending message
    loopMessage(ws)

    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`)
    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has connected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The websocket server is running on port 8081");

async function loopMessage(ws) {
  while(true){
    let unixTime = Date.now();
    ws.send("Server sending UNIX time:" + unixTime);
    await timeout(1*timeMilliSec)
  }
}
