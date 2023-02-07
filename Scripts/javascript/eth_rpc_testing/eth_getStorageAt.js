const ethers = require("ethers");

//Goerli
// const provider = new ethers.providers.JsonRpcProvider(process.env.goerliHTTPS_InfuraAPIKey)
// const contractAddress = '0x080FfD52b6c217C1B69a03446f2956580e25fd43'

//Betanet 1.X
const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/")
const contractAddress = '0x9228dA2e3724A12b4B0d2d621ea501829671cf52'

const storageSlot = 0;

storageLookup();

async function storageLookup() {

  const contents = await provider.getStorageAt(contractAddress,storageSlot)
  console.log(contents)
  
}
