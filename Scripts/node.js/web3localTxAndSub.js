const Web3 = require('web3')
const ethers = require("ethers")

const rpcURL = process.env.goerliHTTPS_InfuraAPIKey// Your RPC URL goes here

// const rpcURL = "http://localhost:8545"// Your RPC URL goes here

const web3 = new Web3(rpcURL)

const provider = new ethers.providers.JsonRpcProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

const contractAddress = '0xdbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37'
const contractABI = [{"anonymous":false,"inputs":[],"name":"setEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

// const contractDeployed = new web3.eth.Contract(contractABI, contractAddress)

const contractDeployed = new ethers.Contract(contractAddress, contractABI, signer);

createAndSendTx();

async function createAndSendTx() {

  // const chainIdConnected = await web3.eth.getChainId();
  // console.log("chainIdConnected: "+chainIdConnected)

  const connectedNetworkObject = await provider.getNetwork();
  const chainIdConnected = connectedNetworkObject.chainId;
  console.log("chainIdConnected: "+ chainIdConnected)

  const storedData = await contractDeployed.storedData()
  console.log("storedData: "+ storedData)

  const unixTIme = Date.now();

  const txCount = await provider.getTransactionCount(signer.address);

  const callDataObject = await contractDeployed.populateTransaction.set(unixTIme);
  const tx_data = callDataObject.data;

  // const callDataObject = await contractDeployed.populateTransaction.set(unixTIme);

  const tx = signer.sendTransaction({
    chainId: chainIdConnected,
    to: contractAddress,
    // to: signer.address,
    nonce:    txCount,
    gasLimit: ethers.utils.hexlify(210000), // Raise the gas limit to a much higher amount
    gasPrice: ethers.utils.hexlify(10000000000),
    data: tx_data
  });

  await tx
  console.log(tx)

}

const web3Sub = new Web3(process.env.goerliWebSocketSecureEventsInfuraAPIKey)

// const web3Sub = new Web3("ws://localhost:8546")

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
