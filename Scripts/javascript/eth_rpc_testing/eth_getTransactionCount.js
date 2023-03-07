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

const timeMilliSec = 1000;

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}

transactionCountTest()

async function transactionCountTest() {

  const txCountBefore = await provider.getTransactionCount(
    "0xc1202e7d42655F23097476f6D48006fE56d38d4f",
    "latest"
  );
  console.log(txCountBefore);

  const storedDataValue = await contractDeployed.storedData()

  // try{
  //  // If you do this, the transaction will not be sent since it will predict the transaction getting reverted.
  //   await contractDeployed.set(storedDataValue); //Will compute the gas limit opcodes automatically and get the oracle gas price per gas unit.  
  // } catch {
  //   console.log("Transaction failed.")
  // }

  //Send a raw transaction to force the failed transaction being sent.
  const connectedNetworkObject = await provider.getNetwork();
  const chainIdConnected = connectedNetworkObject.chainId;
  console.log("chainIdConnected: "+ chainIdConnected)

  const txCount = await provider.getTransactionCount(signer.address); 

  const callDataObject = await contractDeployed.populateTransaction.set(storedDataValue);
  const txData = callDataObject.data;

  const gasPriceOracle = await provider.getGasPrice();

  console.log(gasPriceOracle)

  const gasPriceScaled = (BigInt(gasPriceOracle)*BigInt(110))/(BigInt(100))

  console.log(gasPriceScaled)

  const txSigned = await signer.sendTransaction({
    chainId: chainIdConnected,
    to: contractAddress,
    nonce:    txCount,
    gasLimit: ethers.utils.hexlify(285000), // Raise the gas limit to a much higher amount
    gasPrice: gasPriceScaled,
    data: txData
  });

  console.log(txSigned.hash)

  const blockTime = 12;
  await timeout(3*blockTime*timeMilliSec)

  const txCountAfter = await provider.getTransactionCount(
    "0xc1202e7d42655F23097476f6D48006fE56d38d4f",
    "latest"
  );
  console.log(txCountAfter);

}
