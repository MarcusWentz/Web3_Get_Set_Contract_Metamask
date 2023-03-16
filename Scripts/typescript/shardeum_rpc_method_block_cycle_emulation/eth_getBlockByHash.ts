import axios from "axios";

test_eth_getBlockByHash("0x8e084463bf192349feb8121c1e1de708ebb30701854cbce3a137b8fb8336cda5")

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

async function test_eth_getBlockByHash(cycleToEmulateBlock: String){

  let cycleData = await eth_getBlockByHash(cycleToEmulateBlock);
  console.log("JSON object: ", cycleData);
  console.log("Raw string response: ", JSON.stringify(cycleData));

}