"use strict";
exports.__esModule = true;
//Javascript require
// const https = require('https');
//Typescript import
var https = require("https");
eth_getBlockTransactionCountByNumber(2000);
function eth_getBlockTransactionCountByNumber(cycleToEmulateBlock) {
    var baseUrl = "https://explorer-sphinx.shardeum.org/api/transaction?startCycle=" +
        cycleToEmulateBlock.toString() +
        "&endCycle=" +
        cycleToEmulateBlock.toString();
    console.log(baseUrl);
    var req = https.get(baseUrl, function (res) {
        var data = '', json_data;
        res.on('data', function (stream) {
            data += stream;
        });
        res.on('end', function () {
            var transactionDataJSON = JSON.parse(data);
            var totalTransactionsValue = transactionDataJSON.totalTransactions;
            console.log(totalTransactionsValue);
        });
    });
    req.on('error', function (e) {
        console.log(e.message);
    });
}
