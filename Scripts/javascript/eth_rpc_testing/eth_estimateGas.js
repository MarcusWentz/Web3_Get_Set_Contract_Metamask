const ethers = require("ethers");

//Goerli
const provider = new ethers.providers.JsonRpcProvider(process.env.goerliHTTPS_InfuraAPIKey)
const contractAddress = '0x080FfD52b6c217C1B69a03446f2956580e25fd43'

//Betanet 1.X
// const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/")
// const contractAddress = '0x18e9437821bD2c69A5bCee1896eD18995E5a6A85'

const contractABI = [{"inputs":[],"name":"sameStorageValue","type":"error"},{"anonymous":false,"inputs":[],"name":"setOpenDataEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

const contractDeployed = new ethers.Contract(contractAddress, contractABI, signer);

estimateGasTests()

async function estimateGasTests() {

  const unixTIme = Date.now();
  const callDataObjectSuccess = await contractDeployed.populateTransaction.set(unixTIme);
  const txDataSuccess = callDataObjectSuccess.data;

  const estimateGasSuccess = await provider.estimateGas({
    to: contractAddress,
    data: txDataSuccess,
  });
  console.log(estimateGasSuccess);

  const storedDataValue = await contractDeployed.storedData()
  const callDataObjectFail = await contractDeployed.populateTransaction.set(storedDataValue);
  const txDataFail = callDataObjectFail.data;

  try{
      const estimateGasFail = await provider.estimateGas({
        to: contractAddress,
        data: txDataFail,
      });
      console.log("🔴 Test failed! Gas estimation should not be possible when REVERT opcode is executed.")
      console.log(estimateGasFail);
  } catch (error) {
      console.log("🟢 Test successful! RPC method eth_estimateGas as expected failed to estimate gas, transaction will most likely revert.")
  }

}
