const axios = require('axios');
const ethers = require('ethers')

const rpcURL = "https://liberty20.shardeum.org/"

const provider = new ethers.providers.JsonRpcProvider(rpcURL)

const timeMilliSec = 1000;

listenForCycle()

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}

async function listenForCycle() {
  while (true){

    console.log("Current cycle (1 cycle = 10 blocks [bundles]) ")
    let cycle = await provider.getBlockNumber();
    console.log(Math.floor(cycle/10))

    let baseUrlCycleAddress = "https://explorer-liberty20.shardeum.org/api/transaction?startCycle=" + cycle + "&endCycle=" + cycle + "&address=0x0000000000000000000000000000000000000000" 
    console.log(baseUrlCycleAddress)

    let responseRawJSON = await axios.get(baseUrlCycleAddress);
    let responseDataJSON = responseRawJSON.data;
    let totalTransactions = responseDataJSON.totalTransactions
    console.log(totalTransactions);

    readJSONLoopLatestCycle(totalTransactions,baseUrlCycleAddress)

    await timeout(60*timeMilliSec)

  }
}

async function readJSONLoopLatestCycle(totalTransactions,baseUrl) {

	let total = totalTransactions;
	let pageIndex = 1

	while ( total > 0 ) {

		let filterUrl = baseUrl + "&page=" + pageIndex
		console.log(filterUrl)

		let responseRawJSON = await axios.get(filterUrl);
		responseRawJSON = responseRawJSON.data;
		console.log(responseRawJSON);

    total -= 10;
		pageIndex++;
	}

}
