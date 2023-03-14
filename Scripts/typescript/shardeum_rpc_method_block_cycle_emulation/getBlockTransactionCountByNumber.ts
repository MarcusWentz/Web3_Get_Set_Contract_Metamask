//Javascript require
// const https = require('https');
//Typescript import
import * as https from "https";
import { Stream } from "stream";

eth_getBlockTransactionCountByNumber(2000);

function eth_getBlockTransactionCountByNumber(cycleToEmulateBlock: number) {

	let baseUrl = 
		"https://explorer-sphinx.shardeum.org/api/transaction?startCycle=" + 
		cycleToEmulateBlock.toString() + 
		"&endCycle=" + 
		cycleToEmulateBlock.toString();

	console.log(baseUrl)

	let req = https.get(baseUrl, function(res:Stream) {
		let data = '', json_data;

		res.on('data', function(stream) {
			data += stream;
		});
		res.on('end', function() {

			let transactionDataJSON  = JSON.parse(data);
			let totalTransactionsValue : BigInt = transactionDataJSON.totalTransactions;
			console.log(totalTransactionsValue)

		});
	});

	req.on('error', function(e:Error) {
		console.log(e.message);
	});

}
