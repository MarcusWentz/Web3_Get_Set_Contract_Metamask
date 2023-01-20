const ethers = require("ethers")

// const rpcURL = process.env.goerliHTTPS_InfuraAPIKey //Goerli
const rpcURL = "https://liberty20.shardeum.org/" //Shardeum Liberty 2.1

const provider = new ethers.providers.JsonRpcProvider(rpcURL)

createAndSendTx();

async function createAndSendTx() {

  const connectedNetworkObject = await provider.getNetwork();
  const chainIdConnected = connectedNetworkObject.chainId;
  console.log("chainIdConnected: "+ chainIdConnected)

  if(chainIdConnected == 5) { //Goerli
    tx_info = await provider.getTransaction("0x7bd590a4c9100402fb105f7de66c28a6236c56f4b254c634e53235958f7f50cc")
    console.log(tx_info)
  }
  if(chainIdConnected == 8081) { //Shardeum Liberty 2.1
    tx_info = await provider.getTransaction("0xc0478ea8a26fa562ea8ff6640f2090ac8fa075704bb5f973ab0448a1f2ac22c3")
    console.log(tx_info)
  }

}
