const https = require('https');

let totalTransactions = ""
let baseUrl = "https://explorer-sphinx.shardeum.org/api/transaction?txHash=0x984c937eaf83ea064db2bfa693fbf08a6cd008676ef9ee6ddeb0d8309fc54421"

let req = https.get(baseUrl, function(res) {
	let data = '',
		json_data;

	res.on('data', function(stream) {
		data += stream;
	});
	res.on('end', function() {

		transactionDataJSON = JSON.parse(data);
		transactionDataReadableReceiptJSON = transactionDataJSON.transactions[0].wrappedEVMAccount.readableReceipt
		console.log("event one() emitted at logIndex:", + transactionDataReadableReceiptJSON.logs[0].logIndex );
		console.log("event two() emitted at logIndex:", + transactionDataReadableReceiptJSON.logs[1].logIndex );
		console.log("event three() emitted at logIndex:", + transactionDataReadableReceiptJSON.logs[2].logIndex );
		console.log("event four() emitted at logIndex:", + transactionDataReadableReceiptJSON.logs[3].logIndex );

	});
});

req.on('error', function(e) {
    console.log(e.message);
});
