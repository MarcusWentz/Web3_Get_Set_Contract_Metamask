import axios from "axios";

test_eth_getTransactionByBlockNumberAndIndex()

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

// let transactionArray = [];

async function eth_getBlockReceipts(cycleToEmulateBlock: number): Promise<any[]> {

  // let total = await eth_getBlockTransactionCountByNumber(cycleToEmulateBlock);
  let transactionsInCycle = await eth_getBlockTransactionCountByNumber(cycleToEmulateBlock);
  // let total = 11;
  console.log("Total transactions for cycle 2000: " + transactionsInCycle)
  let pageIndex = 1
  let arrayTransactionsRaw = [];

	let baseUrl = 
		"https://explorer-sphinx.shardeum.org/api/transaction?startCycle=" + 
		cycleToEmulateBlock.toString() + 
		"&endCycle=" + 
		// 2001 ;
    cycleToEmulateBlock.toString() ;

  while (transactionsInCycle > 0) {

    console.log("TOTAL",transactionsInCycle);

    let filterPageIncrement = baseUrl + "&page=" + pageIndex
      
    let responseRawJSON = await axios.get(filterPageIncrement);
    let responseDataJSON = responseRawJSON.data;
    let responseTransactionDataJSON = responseDataJSON.transactions;
    // let totalTransactionsValue = responseDataJSON.totalTransactions; 
  
    // console.log(responseTransactionDataJSON);

    let loopArrayOnPage = 0;
    while(loopArrayOnPage<10) {
      let transactionPointer = responseTransactionDataJSON[loopArrayOnPage];
      if (transactionPointer === undefined) {
        let arrayTransactionsInOrder = arrayTransactionsRaw.reverse();
        console.log("No more transactions on page.");
        console.log("Transaction array length: ", arrayTransactionsInOrder.length)
        // console.log("Transaction array first tx (9/9, index 8 since we count from 0): ", arrayTransactionsInOrder[8])
        // console.log("Transaction array first tx (1/9, index 0 since we count from 0): ", arrayTransactionsInOrder[0])
        return arrayTransactionsInOrder;
      } else {
        arrayTransactionsRaw.push(transactionPointer);
        // console.log(transactionPointer);
      }
      loopArrayOnPage++;
    }
    transactionsInCycle -= 10;
    pageIndex++;

    // console.log(filterPageIncrement)
  }

  return []; //Used to hide compiler error even though we never hit this line since we return in a while loop above.
}

async function eth_getTransactionByBlockNumberAndIndex(blockNumber: number, txIndex: number){
  let arrayTransactionsInOrder =  await eth_getBlockReceipts(2000);
  return arrayTransactionsInOrder[txIndex];
}

async function test_eth_getTransactionByBlockNumberAndIndex() {

  let txIndex =  await eth_getTransactionByBlockNumberAndIndex(2000,8); //Cycle 2000 with transaction 9/9 (index 8 we are counting from 0).
  console.log(txIndex); //Raw Tx
  console.log("Tx Id: " + txIndex.txId); 
  console.log("Tx Hash: 0x" + txIndex.txId); 

}