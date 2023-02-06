const Web3 = require('web3')
const ethers = require("ethers")

const rpcURL = "https://liberty20.shardeum.org/"
const web3 = new Web3(rpcURL)

const provider = new ethers.providers.JsonRpcProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);
console.log("User wallet address: " + signer.address)

const simpleStorageAddress = '0x0341eeb7ddb1171a3A2c5209F14Df86f4B211cF9'
const simpleStorageABI = [{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"slot0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

const simpleStorageDeployed = new web3.eth.Contract(simpleStorageABI, simpleStorageAddress)

createAndSendTx();

async function createAndSendTx() {

    const chainIdConnected = await web3.eth.getChainId();
    console.log("chainIdConnected: "+ chainIdConnected)

    const slot0 = await simpleStorageDeployed.methods.slot0().call()
    console.log("slot0: "+ slot0)

    const unixTime = Date.now();
    console.log("UNIX TIME: " + unixTime)

    const txCount = await provider.getTransactionCount(signer.address);

    const tx = signer.sendTransaction({
          chainId: chainIdConnected,
          to: simpleStorageAddress,
          nonce:    web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(300000), // Raise the gas limit to a much higher amount
          gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
          data: simpleStorageDeployed.methods.set(unixTime).encodeABI(),
          type: 1,
          accessList: [
            {
              address: simpleStorageAddress,
              storageKeys: [
                "0x0000000000000000000000000000000000000000000000000000000000000000",
              ]
            }
          ]

    });

    console.log("WAIT FOR TX RECEIPT: ")
    await tx
    console.log("TX RECEIPT: ")
    console.log(tx)

}
