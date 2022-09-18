const https = require('https');

let totalTransactions = ""
let baseUrl = "https://explorer.liberty20.shardeum.org/api/transaction?startCycle=0&endCycle=1000&address=0x0000000000000000000000000000000000000000"

let req = https.get(baseUrl, function(res) {
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

	});
});

req.on('error', function(e) {
    console.log(e.message);
});



function readJSONLoop(){

	let totalTransactions = ""
	let baseUrl = "https://explorer.liberty20.shardeum.org/api/transaction?startCycle=0&endCycle=1000&address=0x0000000000000000000000000000000000000000"

	let total = 34;
	let pageIndex = 1

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
				// totalTransactions = json_data.totalTransactions
				// console.log(totalTransactions);
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
