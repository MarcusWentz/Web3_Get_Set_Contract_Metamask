const ethers = require("ethers") // npm i ethers@5.7.2 https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/5139#discussioncomment-5444517

const rpcURL = process.env.sepoliaInfuraWSS // Your RPC URL goes here
const provider = new ethers.providers.WebSocketProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

const contractAddress = '0xbf1Ce7005951e92B0A23cB3ed6F4BfA897631FEA'
const contractAbi = [{"type":"constructor","name":"__init__","inputs":[],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"storage_slot_0","inputs":[],"outputs":[{"name":"","type":"uint256"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address"}],"stateMutability":"view"},{"type":"function","name":"set","inputs":[{"name":"input","type":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"owner_time_store","inputs":[],"outputs":[],"stateMutability":"payable"},{"type":"event","name":"error_same_value","inputs":[],"anonymous":false},{"type":"event","name":"event_value_update","inputs":[{"name":"value","type":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Context","inputs":[],"anonymous":false}];
const contractDeployed = new ethers.Contract(contractAddress, contractAbi, signer);

createAndSendTx()
getStoredData()
getOwner()

async function getStoredData() {  
  const storedData = await contractDeployed.storage_slot_0()
  console.log("storage_slot_0: "+ storedData)
}

async function getOwner() {  
  const ownerStorage = await contractDeployed.owner()
  console.log("owner: "+ ownerStorage)
}

async function createAndSendTx() {

  const connectedNetworkObject = await provider.getNetwork();
  const chainIdConnected = connectedNetworkObject.chainId;
  console.log("chainIdConnected: "+ chainIdConnected)

  // // Revert since we have this value in storage already.
  // const storedData = await contractDeployed.storage_slot_0()
  // console.log("storage_slot_0: "+ storedData)
  // const txSigned = await contractDeployed.set(storedData); //Will compute the gas limit opcodes automatically and get the oracle gas price per gas unit.

  // // Revert if devTestnetPrivateKeyTwo or some other non owner address calls this function.
  // const txSigned = await contractDeployed.owner_time_store(); //Will compute the gas limit opcodes automatically and get the oracle gas price per gas unit.

  const unixTime = Date.now();
  const txSigned = await contractDeployed.set(unixTime); //Will compute the gas limit opcodes automatically and get the oracle gas price per gas unit.
 
  console.log(txSigned) 
}

contractDeployed.on("event_value_update", (eventDetected) => {
  console.log("EVENT DETECTED! EVENT LOG: ")
  console.log(eventDetected)
  console.log("NEW STATE VALUE: ")
  getStoredData()
});
