const ethers = require("ethers");

// Goerli
const provider = new ethers.providers.JsonRpcProvider(process.env.goerliHTTPS_InfuraAPIKey)
const contractAddress = '0x080FfD52b6c217C1B69a03446f2956580e25fd43'

// Betanet 1.X
// const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/")
// const contractAddress = '0xD55b6893779d64756Ed0162579f54F2Fc83bAC24'

const contractABI = [{"inputs":[],"name":"sameStorageValue","type":"error"},{"anonymous":false,"inputs":[],"name":"setOpenDataEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

const contractDeployed = new ethers.Contract(contractAddress, contractABI, signer);

transactionCountTest()

async function transactionCountTest() {

  const txCountBefore = await provider.getTransactionCount(
    "0xc1202e7d42655F23097476f6D48006fE56d38d4f",
    "latest"
  );
  console.log(txCountBefore);

  const storedDataValue = await contractDeployed.storedData()

  try{
    await contractDeployed.set(storedDataValue); //Will compute the gas limit opcodes automatically and get the oracle gas price per gas unit.
  } catch {
      console.log("Transaction failed as expected.")
  }

const txCountAfter = await provider.getTransactionCount(
  "0xc1202e7d42655F23097476f6D48006fE56d38d4f",
  "latest"
);
console.log(txCountAfter);

}