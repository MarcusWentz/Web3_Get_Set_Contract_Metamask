const https = require('https');
const Web3 = require('web3')

const rpcURL = "https://liberty20.shardeum.org/"
const web3 = new Web3(rpcURL)

console.log("chainId:")
web3.eth.getChainId().then(console.log);

let addressToSubscribeTo = "0x0000000000000000000000000000000000000000"

const timeMilliSec = 1000;

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}

async function listenForCycle() {
  while (true){

    console.log("Current cycle (1 cycle = 10 blocks [bundles]) ")
    let cycle = await web3.eth.getBlockNumber();
    console.log(Math.floor(cycle/10))

    let totalTransactions = ""
    let baseUrlCycleAddress = "https://explorer.liberty10.shardeum.org/api/transaction?startCycle=" + cycle + "&endCycle=" + cycle + "&address=" + addressToSubscribeTo

    let req = https.get(baseUrlCycleAddress, function(res) {
      let data = '',
        json_data;

      res.on('data', function(stream) {
        data += stream;
      });
      res.on('end', function() {

        json_data = JSON.parse(data);
        totalTransactions = json_data.totalTransactions
        console.log(totalTransactions);
        let pageIndex = 1;

        readJSONLoop(totalTransactions,baseUrlCycleAddress)

      });
    });

    req.on('error', function(e) {
        console.log(e.message);
    });

    await timeout(60*timeMilliSec)

  }
}

listenForCycle()

function readJSONLoop(totalTransactions,baseUrlCycleAddress) {

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
