const https = require('https');

let totalTransactions = ""
let baseUrl = "https://explorer-liberty20.shardeum.org/api/transaction?startCycle=0&endCycle=106355&address=0x420129edbd63e1ce07c855a00e97fd2b79415b97"

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

    readJSONLoop(totalTransactions)

	});
});

req.on('error', function(e) {
    console.log(e.message);
});


function readJSONLoop(totalTransactions) {

	let total = totalTransactions;
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