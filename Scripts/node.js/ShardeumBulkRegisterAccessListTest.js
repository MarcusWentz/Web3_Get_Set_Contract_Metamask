const Web3 = require('web3')
const ethers = require("ethers")

const rpcURL = "https://liberty20.shardeum.org/"
const web3 = new Web3(rpcURL)

const { expect } = require("chai");

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}

const timeMilliSec = 1000;

const provider = new ethers.providers.JsonRpcProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);
console.log("User wallet address: " + signer.address)

const simpleStorageAddress = '0xc75e3e6b3697edda3be8d96f0690c58ccb990a84'
const simpleStorageABI = [{"inputs":[{"internalType":"address[]","name":"myArray","type":"address[]"}],"name":"bulkSend","outputs":[],"stateMutability":"payable","type":"function"}]

const simpleStorageDeployed = new web3.eth.Contract(simpleStorageABI, simpleStorageAddress)

createAndSendTx();

async function createAndSendTx() {

  const chainIdConnected = await web3.eth.getChainId();
  console.log("chainIdConnected: "+ chainIdConnected)

  const balanceBefore1 = await provider.getBalance("0x66C1d8A5ee726b545576A75380391835F8AAA43c");
  const balanceBefore2 = await provider.getBalance("0xD0E222A8b806E0B7e89dEcDCdFD6F9a2BeA9cdF6");
  const balanceBefore3 = await provider.getBalance("0xBB4aEDcB7F5a8B8B7868287374519Fc3b7aAD5Fa");

  const txCount = await provider.getTransactionCount(signer.address);

  const tx = signer.sendTransaction({
    chainId: chainIdConnected,
    to: simpleStorageAddress,
    data: simpleStorageDeployed.methods.bulkSend([
      "0x66C1d8A5ee726b545576A75380391835F8AAA43c",
      "0xD0E222A8b806E0B7e89dEcDCdFD6F9a2BeA9cdF6",
      "0xBB4aEDcB7F5a8B8B7868287374519Fc3b7aAD5Fa"
      ]).encodeABI(),
    value: "3000000000000000000", //3 ether SHM.
    nonce:    web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(300000), // Raise the gas limit to a much higher amount
    gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
    type: 1,
    accessList: [
      {
        address: "0x66C1d8A5ee726b545576A75380391835F8AAA43c",
        storageKeys: []
      },
      {
        address: "0xD0E222A8b806E0B7e89dEcDCdFD6F9a2BeA9cdF6",
        storageKeys: []
      },
      {
        address: "0xBB4aEDcB7F5a8B8B7868287374519Fc3b7aAD5Fa",
        storageKeys: []
      }
    ]

  });

  await tx
  console.log("TX RECEIPT: ")
  console.log(tx)

  console.log("WAIT FOR RESULTS: ")
  await timeout(15*timeMilliSec)

  const balanceAfter1 = await provider.getBalance("0x66C1d8A5ee726b545576A75380391835F8AAA43c");
  const balanceAfter2 = await provider.getBalance("0xD0E222A8b806E0B7e89dEcDCdFD6F9a2BeA9cdF6");
  const balanceAfter3 = await provider.getBalance("0xbb4aedcb7f5a8b8b7868287374519fc3b7aad5fa");

  console.log(balanceBefore1.toString())
  console.log(balanceAfter1.toString())
  expect(balanceAfter1.toString()).to.equal( (BigInt(balanceBefore1)+BigInt("1000000000000000000")).toString() );
  console.log("Test 1 pass.")

  console.log(balanceBefore2.toString())
  console.log(balanceAfter2.toString())
  expect(balanceAfter2.toString()).to.equal( (BigInt(balanceBefore2)+BigInt("1000000000000000000")).toString() );
  console.log("Test 2 pass.")
  
  console.log(balanceBefore3.toString())
  console.log(balanceAfter3.toString())
  expect(balanceAfter3.toString()).to.equal( (BigInt(balanceBefore3)+BigInt("1000000000000000000")).toString() );
  console.log("Test 3 pass.")

  console.log("All tests passed.")

}
