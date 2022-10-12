const WebSocketServer = require('ws');
const wss = new WebSocketServer.Server({ port: 8081 })
const https = require('https');
const Web3 = require('web3')

const rpcURL = "https://liberty20.shardeum.org/"
const web3 = new Web3(rpcURL)

console.log("chainId:")
web3.eth.getChainId().then(console.log);

const timeMilliSec = 1000;

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}

console.log("Wait for client to connect before sending data...")

// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected");
    // sending message
    // loopMessage(ws)
		listenForCycle(ws)

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

async function listenForCycle(ws) {
	while (true){
    console.log("Previous cycle (1 cycle = 10 blocks [bundles]) ")
    let currentBlock = await web3.eth.getBlockNumber();
		let currentCycle = Math.floor(currentBlock/10);
		// let prevoiusCycle = currentCycle - 1;
    console.log(currentCycle)

    let totalTransactions = ""
    let baseUrlCycleAddress = "https://explorer.liberty20.shardeum.org/api/transaction?startCycle=" + currentCycle + "&endCycle=" + currentCycle
    console.log(baseUrlCycleAddress)

    let req = https.get(baseUrlCycleAddress, function(res) {
      let data = '',
        json_data;

      res.on('data', function(stream) {
        data += stream;
      });
      res.on('end', function() {

        json_data = JSON.parse(data);
        totalTransactions = json_data.totalTransactions
        console.log(totalTransactions)
				// ws.send("a")

        let pageIndex = 1;

        readJSONLoop(totalTransactions,baseUrlCycleAddress,ws)

      });
    });

    req.on('error', function(e) {
        console.log(e.message);
    });

    await timeout(60*timeMilliSec)

  }
}

function readJSONLoop(totalTransactions,baseUrlCycleAddress,ws) {

	let total = totalTransactions;
	let pageIndex = 1
  let baseUrl = baseUrlCycleAddress;

	while (total>0) {

		let filterUrl = baseUrl + "&page=" + pageIndex
		let req = https.get(filterUrl, function(res) {
			let data = '',
				json_data;

			res.on('data', function(stream) {
				data += stream;
			});
			res.on('end', function() {

				json_data = JSON.parse(data);
				console.log(json_data);
				ws.send(JSON.stringify(json_data));
		    let pageIndex = 1;

			});
		});

		req.on('error', function(e) {
		    console.log(e.message);
		});

	  total -= 10;
		pageIndex++;
		console.log(filterUrl)
	}

}
