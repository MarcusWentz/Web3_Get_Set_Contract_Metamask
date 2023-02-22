const ethers = require("ethers");

//Goerli
const provider = new ethers.providers.JsonRpcProvider(process.env.goerliHTTPS_InfuraAPIKey)
const contractAddress = '0x080FfD52b6c217C1B69a03446f2956580e25fd43'

//Betanet 1.X
// const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/")
// const contractAddress = '0x8414F1BaC5fCdA2C274A4a78D0D62109f1Cbb6C8'

//Liberty 2.X
// const provider = new ethers.providers.JsonRpcProvider("https://liberty20.shardeum.org/")
// const contractAddress = '0xC8b70cCB981Ac7a19b6b8d21f172d97231539575'

//Liberty 1.X
// const provider = new ethers.providers.JsonRpcProvider("https://liberty10.shardeum.org/")
// const contractAddress = '0x5eCe667D03F29695937F23178aBad9B89434D630'

const storageSlot = 0;

storageLookup();

async function storageLookup() {

  const contents = await provider.getStorageAt(contractAddress,storageSlot)
  console.log(contents)
  
}
