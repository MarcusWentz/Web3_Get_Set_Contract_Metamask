const axios = require('axios');

let baseUrl = "https://explorer-sphinx.shardeum.org/api/transaction?txHash=0xc36b485971a68b1371126d1d5f93002bd40f8fd29c861a8cc59709d20f162b78"

test_transaction_event_logIndex(baseUrl)

async function test_transaction_event_logIndex(baseUrl) {

	let responseRawJSON = await axios.get(baseUrl);
	let responseDataJSON = responseRawJSON.data;

	transactionDataReadableReceiptJSON = responseDataJSON.transactions[0].wrappedEVMAccount.readableReceipt
	console.log("event one() emitted at logIndex:", + transactionDataReadableReceiptJSON.logs[0].logIndex );
	console.log("event two() emitted at logIndex:", + transactionDataReadableReceiptJSON.logs[1].logIndex );
	console.log("event three() emitted at logIndex:", + transactionDataReadableReceiptJSON.logs[2].logIndex );
	console.log("event four() emitted at logIndex:", + transactionDataReadableReceiptJSON.logs[3].logIndex );

}


