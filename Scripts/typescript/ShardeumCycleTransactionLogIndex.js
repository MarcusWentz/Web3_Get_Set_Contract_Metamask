var https = require('https');
var totalTransactions = "";
var baseUrl = "https://explorer-sphinx.shardeum.org/api/transaction?txHash=0xc36b485971a68b1371126d1d5f93002bd40f8fd29c861a8cc59709d20f162b78";
var req = https.get(baseUrl, function(res) {
    var data = '', json_data;
    res.on('data', function (stream) {
        data += stream;
    });
    res.on('end', function () {
        transactionDataJSON = JSON.parse(data);
        transactionDataReadableReceiptJSON = transactionDataJSON.transactions[0].wrappedEVMAccount.readableReceipt;
        console.log("event one() emitted at logIndex:", +transactionDataReadableReceiptJSON.logs[0].logIndex);
        console.log("event two() emitted at logIndex:", +transactionDataReadableReceiptJSON.logs[1].logIndex);
        console.log("event three() emitted at logIndex:", +transactionDataReadableReceiptJSON.logs[2].logIndex);
        console.log("event four() emitted at logIndex:", +transactionDataReadableReceiptJSON.logs[3].logIndex);
    });
});
req.on('error', function (e) {
    console.log(e.message);
});
