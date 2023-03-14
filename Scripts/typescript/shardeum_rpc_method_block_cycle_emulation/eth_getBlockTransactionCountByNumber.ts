//Javascript require
// const axios = require('axios');
//Typescript import
import axios from "axios";

testConvertCycleToBlockForTransactionCount(2000)

async function testConvertCycleToBlockForTransactionCount(cycleToEmulateBlock: number){

	let testValue = await eth_getBlockTransactionCountByNumber(cycleToEmulateBlock);
    console.log("Total transactions for cycle 2000: " + testValue)

}

async function eth_getBlockTransactionCountByNumber(cycleToEmulateBlock: number) {

	let baseUrl = 
		"https://explorer-sphinx.shardeum.org/api/transaction?startCycle=" + 
		cycleToEmulateBlock.toString() + 
		"&endCycle=" + 
		cycleToEmulateBlock.toString();
    
    let responseRawJSON = await axios.get(baseUrl);
    let responseDataJSON = responseRawJSON.data;
    let totalTransactionsValue = responseDataJSON.totalTransactions; 
    return totalTransactionsValue

}
