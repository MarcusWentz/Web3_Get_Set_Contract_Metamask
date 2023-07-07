const ethers = require("ethers") // npm i ethers@5.7.2 https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/5139#discussioncomment-5444517

const rpcURL = "ws://127.0.0.1:8545"
// const rpcURL = process.env.sepoliaInfuraWSS // Your RPC URL goes here
const provider = new ethers.providers.WebSocketProvider(rpcURL)
// const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);
const signer = new ethers.Wallet(Buffer.from(process.env.anvilPrivateKey, 'hex'), provider);

const contractAddress = '0x8a791620dd6260079bf849dc5567adc3f2fdc318'

createAndSendTx()
getStoredData()

async function getStoredData() {  
  const response = await provider.send("eth_call", [
    {
      "to": contractAddress,
      "data": getFunctionSelectorHex("getValue()"),
    },
    "latest",
  ]);
  console.log(response)

}

// async function getOwner() {  
//   const ownerStorage = await contractDeployed.owner()
//   console.log("owner: "+ ownerStorage)
// }

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
  // const timeBytes32 = ethers.utils.hexZeroPad(ethers.utils.hexlify(unixTime), 32)
  // const timeBytes32 = ethers.utils.hexZeroPad(ethers.utils.hexlify(0), 32)
  const timeBytes32 = ethers.utils.hexZeroPad(ethers.utils.hexlify(5), 32)
  const txData = getFunctionSelectorHex("setValue(uint256)") + timeBytes32.slice(2,timeBytes32.length)
  console.log(txData)

  // const response = await provider.send("eth_call", [
  //   {
  //     "to": contractAddress,
  //     "data": txData,
  //   },
  //   "latest",
  // ]);
  // console.log(response)

  const txSigned = await signer.sendTransaction({
    to: contractAddress,
    // gasLimit: 500000,
    data: txData
  });

  console.log(txSigned)

}

let eventNameTypeTopicHashed = ethers.utils.id("valueUpdated()");
console.log("Computed vs Etherscan eventNameTypeTopicHashed value:")
console.log(eventNameTypeTopicHashed)
console.log("0xc5ab16f1bddb259b10fe689dea60d8cce8e149cda6275168becc5bc11b2fc354")

eventFilter = {
    address: contractAddress,
    topics: [
        eventNameTypeTopicHashed, //Event name with types hashed 32 bytes.
    ]
}

console.log("Listen for new events...")

provider.on(eventFilter, (eventDetected) => {
    console.log("EVENT DETECTED! NEW STATE VALUE:")
    console.log(eventDetected)
    getStoredData()
    console.log("Listen for new events...")
})

function getFunctionSelectorHex(functionString) {
  const hexStringFunction = ethers.utils.toUtf8Bytes(functionString)
  const hexStringFunctionHashed = ethers.utils.keccak256(hexStringFunction)
  const functionSelector = hexStringFunctionHashed.slice(0,10);
  return functionSelector;
}