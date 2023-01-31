const Web3 = require('web3')

const rpcURL = process.env.goerliHTTPS_InfuraAPIKey // Your RPC URL goes here

const web3 = new Web3(rpcURL)

storageLookup();

async function storageLookup() {

  const contents = await web3.eth.getStorageAt("0xED51f057E0D28A60e7a139bEFacdD79ADEb94c62", 777)
  console.log(contents)
}
