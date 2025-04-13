import axios from "axios";

test_eth_getBlockTransactionCountByHash("0xf2a9a9aa1e71d24f0f072f7ee3a2a46df1dd5b30ecdf44aa4742372470ebd1a4") //Cycle hash for cycle 2000

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

async function eth_getBlockByHash(cycleToEmulateBlockHash: String) {

  if(cycleToEmulateBlockHash.slice(0,2) != "0x" ){
    console.log("Block hash should start with 0x!")
    return;
  }

  if(cycleToEmulateBlockHash.length != 66){
    console.log("Block hash is not 66 characters long!")
    return 
  }

	let baseUrl = 
    "https://explorer-sphinx.shardeum.org/api/cycleinfo?marker=" + 
    cycleToEmulateBlockHash.slice(2,66); //Hide the 0x for the Explorer API since it is not used.
    
  console.log(baseUrl)

    let responseRawJSON = await axios.get(baseUrl);
    let responseDataJSON = responseRawJSON.data;
    return responseDataJSON

}

async function test_eth_getBlockTransactionCountByHash(cycleToEmulateBlock: String){
    
    console.log("cycleToEmulateBlock Hash (cycle 2000): " + cycleToEmulateBlock)
    let cycleTxCount = await eth_getBlockTransactionCountByHash(cycleToEmulateBlock);
    console.log("cycleTxCount: " + cycleTxCount)

}

async function eth_getBlockTransactionCountByHash(cycleToEmulateBlock: String){

    let cycleData = await eth_getBlockByHash(cycleToEmulateBlock);
    let cycleNumber = cycleData.cycles[0].counter;
    let cycleTxCount = await eth_getBlockTransactionCountByNumber(cycleNumber);
    return cycleTxCount;

}