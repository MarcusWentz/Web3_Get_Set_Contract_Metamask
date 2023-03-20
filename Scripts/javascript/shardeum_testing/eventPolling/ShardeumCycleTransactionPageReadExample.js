const axios = require('axios');

let baseUrl = "https://explorer-sphinx.shardeum.org/api/transaction?startCycle=49330&endCycle=49330&address=0x6bd9e67bf927da1935b6eaea9bf22500c4e1f53a"

getTransactionsToAddressCycleRange(baseUrl)

async function readJSONLoop(totalTransactions) {

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

async function getTransactionsToAddressCycleRange(baseUrl) {

	let responseRawJSON = await axios.get(baseUrl);
	let responseDataJSON = responseRawJSON.data;
	let totalTransactions = responseDataJSON.totalTransactions
	console.log(totalTransactions);

	readJSONLoop(totalTransactions)
    
}