import axios from "axios";

test_eth_getBlockByNumber(42620)

async function eth_getBlockByNumber(cycleToEmulateBlock: number) {

	let baseUrl = 
    "https://explorer-sphinx.shardeum.org/api/cycleinfo?from=" + 
    cycleToEmulateBlock.toString() +
    "&to=" +
    cycleToEmulateBlock.toString();
    
    // console.log(baseUrl)

    let responseRawJSON = await axios.get(baseUrl);
    let responseDataJSON = responseRawJSON.data;
    return responseDataJSON

}

async function test_eth_getBlockByNumber(cycleToEmulateBlock: number){

  let cycleData = await eth_getBlockByNumber(cycleToEmulateBlock);
  console.log("JSON object: ", cycleData);
  console.log("Raw string response: ", JSON.stringify(cycleData));

}