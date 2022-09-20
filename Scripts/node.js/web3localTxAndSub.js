const Web3 = require('web3')
const ethers = require("ethers")

const rpcURL = process.env.goerliHTTPS_InfuraAPIKey// Your RPC URL goes here
const web3 = new Web3(rpcURL)

const provider = new ethers.providers.JsonRpcProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

const contractAddress = '0xdbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37'
const contractABI = [{"anonymous":false,"inputs":[],"name":"setEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

const contractDeployed = new web3.eth.Contract(contractABI, contractAddress)

createAndSendTx();

async function createAndSendTx() {

  const chainIdConnected = await web3.eth.getChainId();
  console.log("chainIdConnected: "+chainIdConnected)

  const storedData = await contractDeployed.methods.storedData().call()
  console.log("storedData: "+storedData)

  const unixTIme = Date.now();

  const txCount = await provider.getTransactionCount(signer.address);

  const tx = signer.sendTransaction({
    chainId: chainIdConnected,
    nonce:    web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(30000), // Raise the gas limit to a much higher amount
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    to: contractAddress,
    data: contractDeployed.methods.set(unixTIme).encodeABI()
  });

  await tx
  console.log(tx)


}

const web3Sub = new Web3(process.env.goerliWebSocketSecureEventsInfuraAPIKey)
const eventsListener = new web3Sub.eth.Contract(contractABI, contractAddress)

// //Subscribe to event.
eventsListener.events.setEvent({
     fromBlock: 'latest'
 }, function(error, eventResult){})
 .on('data', function(eventResult){
    //console.log(eventResult)
   //Call the get function to get the most accurate present state for the value.
   console.log("EVENT DETECTED! NEW STATE VALUE: ")

   eventsListener.methods.storedData().call((err, balance) => {
     console.log({ err, balance })
   })

   })
 .on('changed', function(eventResult){
     // remove event from local database
 })
 .on('error', console.error);
