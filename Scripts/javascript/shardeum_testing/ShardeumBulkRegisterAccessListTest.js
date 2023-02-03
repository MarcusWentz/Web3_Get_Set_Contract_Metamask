const ethers = require("ethers")

const rpcURL = "https://sphinx.shardeum.org/"

const { expect } = require("chai");

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}

const timeMilliSec = 1000;

const provider = new ethers.providers.JsonRpcProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);
console.log("User wallet address: " + signer.address)

const simpleStorageAddress = '0x26944D609d966F800738CC764CC962A3bFA9aFFe'
const simpleStorageABI = [{"inputs":[{"internalType":"address[]","name":"myArray","type":"address[]"}],"name":"bulkSend","outputs":[],"stateMutability":"payable","type":"function"}]

const simpleStorageDeployed = new ethers.Contract(simpleStorageAddress, simpleStorageABI, signer);

createAndSendTx();

async function createAndSendTx() {

  const connectedNetworkObject = await provider.getNetwork();
  const chainIdConnected = connectedNetworkObject.chainId;
  console.log("chainIdConnected: "+ chainIdConnected)

  const receiverAddress1 = "0x66C1d8A5ee726b545576A75380391835F8AAA43c"; //Wallet 1.
  const receiverAddress2 = "0xD0E222A8b806E0B7e89dEcDCdFD6F9a2BeA9cdF6"; //Wallet 2.
  const receiverAddress3 = "0x75228115053189d4B70144b2BBEE63bD491fe614"; //Proxy Wallet.

  const balanceBefore1 = await provider.getBalance(receiverAddress1);
  const balanceBefore2 = await provider.getBalance(receiverAddress2);
  const balanceBefore3 = await provider.getBalance(receiverAddress3);

  const txCount = await provider.getTransactionCount(signer.address);

  const callDataObject = await simpleStorageDeployed.populateTransaction.bulkSend([
    receiverAddress1,
    receiverAddress2,
    receiverAddress3
  ]);
  const txData = callDataObject.data;

  const tx = signer.sendTransaction({
    chainId: chainIdConnected,
    to: simpleStorageAddress,
    data: txData,
    value:    ethers.utils.parseEther("3.0"), //3 ether SHM.
    nonce:    ethers.utils.hexlify(txCount),
    gasLimit: ethers.utils.hexlify(300000), // Raise the gas limit to a much higher amount
    gasPrice: ethers.utils.hexlify(30000000000),
    type: 1,
    accessList: [
      {
        address: receiverAddress1,
        storageKeys: []
      },
      {
        address: receiverAddress2,
        storageKeys: []
      },
      {
        address: receiverAddress3,
        storageKeys: []
      }
    ]
 
  });

  await tx
  console.log("TX RECEIPT: ")
  console.log(tx)

  console.log("WAIT FOR RESULTS: ")
  await timeout(15*timeMilliSec)

  const balanceAfter1 = await provider.getBalance(receiverAddress1);
  const balanceAfter2 = await provider.getBalance(receiverAddress2);
  const balanceAfter3 = await provider.getBalance(receiverAddress3);

  console.log(balanceBefore1.toString())
  console.log(balanceAfter1.toString())
  try{
    expect(BigInt(balanceAfter1).toString())
    .to.equal( (BigInt(balanceBefore1)+BigInt("1000000000000000000")).toString() );
  } catch (err) {
    console.log("🔴 Test 1 fail. Error: " + err)
    return;
  }

  console.log(balanceBefore2.toString())
  console.log(balanceAfter2.toString())
  try{
    expect(BigInt(balanceAfter2).toString())
    .to.equal( (BigInt(balanceBefore2)+BigInt("1000000000000000000")).toString() );
  } catch (err) {
    console.log("🔴 Test 2 fail. Error: " + err)
    return;
  }
  
  console.log(balanceBefore3.toString())
  console.log(balanceAfter3.toString())
  try{
    expect(BigInt(balanceAfter3).toString())
    .to.equal( (BigInt(balanceBefore3)+BigInt("1000000000000000000")).toString() );
  } catch (err) {
    console.log("🔴 Test 3 fail. Error: " + err)
    return;
  }

  console.log("🟢 All tests passed.")

}
