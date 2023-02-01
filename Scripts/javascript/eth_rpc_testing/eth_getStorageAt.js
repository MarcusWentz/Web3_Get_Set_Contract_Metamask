const ethers = require("ethers");

//Goerli
// const provider = new ethers.providers.JsonRpcProvider(process.env.goerliHTTPS_InfuraAPIKey)
// const contractAddress = '0x080FfD52b6c217C1B69a03446f2956580e25fd43'

//Liberty 2.X
const provider = new ethers.providers.JsonRpcProvider("https://liberty20.shardeum.org/")
const contractAddress = '0x68611038f494bE3173F6F93DaEE756cA85aA4a54'

const storageSlot = 0;

storageLookup();

async function storageLookup() {

  const contents = await provider.getStorageAt(contractAddress,storageSlot)
  console.log(contents)
  
}
