const ethers = require("ethers") // npm i ethers@5.7.2 https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/5139#discussioncomment-5444517

const rpcURL = process.env.sepoliaInfuraWSS // Your RPC URL goes here

// const rpcURL = "http://localhost:8545"// Your RPC URL goes here

// const provider = new ethers.providers.WebSocketProvider("wss://ws.test.taiko.xyz")
// const contractAddress = '0x090b750b9B5251828E16360Fd69100dc4c674e71'

const provider = new ethers.providers.WebSocketProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

const contractAddress = '0xBBE97Afb978E19033e0BDa692E6034F5b3B91312'
const contractABI = [{"anonymous":false,"inputs":[],"name":"setEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

// const contractDeployed = new web3.eth.Contract(contractABI, contractAddress)

const contractDeployed = new ethers.Contract(contractAddress, contractABI, signer);

createAndSendTx()
getStoredData()

async function getStoredData() {  
  const storedData = await contractDeployed.storedData()
  console.log("storedData: "+ storedData)
}

async function createAndSendTx() {

  const connectedNetworkObject = await provider.getNetwork();
  const chainIdConnected = connectedNetworkObject.chainId;
  console.log("chainIdConnected: "+ chainIdConnected)

  const unixTime = Date.now();


  //Simple contract transaction.
  const txSigned = await contractDeployed.set(unixTime); //Will compute the gas limit opcodes automatically and get the oracle gas price per gas unit.

  //Tune transaction with custom arguments: https://github.com/ethers-io/ethers.js/issues/40#issuecomment-841749793.
  // const txSigned = await contractDeployed.
  //   set(
  //     unixTime,
  //   {
  //    value: 0,                                          
  //    gasPrice: ethers.utils.parseUnits('200', 'gwei'),  
  //   }
  // );

  // Raw transaction (harder to use since the contract calls will automatically calculate the gas limit for you.)

  // const txCount = await provider.getTransactionCount(signer.address); 

  // const callDataObject = await contractDeployed.populateTransaction.set(unixTIme);
  // const txData = callDataObject.data;

  // const txSigned = await signer.sendTransaction({
  //   chainId: chainIdConnected,
  //   to: contractAddress,
  //   nonce:    txCount,
  //   gasLimit: ethers.utils.hexlify(210000), // Raise the gas limit to a much higher amount
  //   gasPrice: ethers.utils.hexlify(10000000000),
  //   data: txData
  // });

  console.log(txSigned)

}

contractDeployed.on("setEvent", (eventDetected) => {

  console.log("EVENT DETECTED! EVENT LOG: ")

  console.log(eventDetected)

  console.log("NEW STATE VALUE: ")

  getStoredData()

});