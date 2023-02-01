const ethers = require("ethers");

const rpcURL = process.env.goerliHTTPS_InfuraAPIKey // Your RPC URL goes here

const provider = new ethers.providers.JsonRpcProvider(rpcURL)

storageLookup();

async function storageLookup() {

  const contents = await provider.getStorageAt(
    "0xED51f057E0D28A60e7a139bEFacdD79ADEb94c62", 
    777
  )
  console.log(contents)
  
}
