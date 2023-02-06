const ethers = require("ethers")

// const rpcURL = process.env.goerliHTTPS_InfuraAPIKey //Goerli
// const rpcURL = process.env.mumbaiInfuraHTTPS //Polygon Mumbai
const rpcURL = "https://sphinx.shardeum.org/" //Shardeum Sphinx 1.X

const provider = new ethers.providers.JsonRpcProvider(rpcURL)

createAndSendTx();

async function createAndSendTx() {

  const connectedNetworkObject = await provider.getNetwork();
  const chainIdConnected = connectedNetworkObject.chainId;
  console.log("chainIdConnected: "+ chainIdConnected)

  if(chainIdConnected == 5) { //Goerli
    console.log(connectedNetworkObject)
  }
  if(chainIdConnected == 8082) { //Shardeum Sphinx 1.X
    console.log(connectedNetworkObject)
  }
  if(chainIdConnected == 80001) { //Polygon Mumbai
    console.log(connectedNetworkObject)
  }

}