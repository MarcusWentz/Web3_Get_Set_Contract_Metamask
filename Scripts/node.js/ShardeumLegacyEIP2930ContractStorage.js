const Web3 = require('web3')
var Tx = require("ethereumjs-tx")

const rpcURL = "https://liberty20.shardeum.org/"
const web3 = new Web3(rpcURL)

console.log("chainId:")
web3.eth.getChainId().then(console.log);

const devTestnetPrivateKey = Buffer.from(process.env.devTestnetPrivateKey, 'hex')
const devWalletAddress = web3.eth.accounts.privateKeyToAccount(process.env.devTestnetPrivateKey).address;

const contractAddress_JS = '0x50684c64F4b80b5687d0891c9339De8fFE281A33'
const contractABI_JS = [{"anonymous":false,"inputs":[],"name":"setEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

function checkValueLatest() {
  contractDefined_JS.methods.storedData().call((err, balance) => {
    console.log({ err, balance })
  })
}

function createAndSendTx() {

    const unixTIme = Date.now();
    web3.eth.getTransactionCount(devWalletAddress, (err, txCount) => {
      const txObject = {
        nonce:    web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(300000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
        to: contractAddress_JS,
        data: contractDefined_JS.methods.set(unixTIme).encodeABI(),
        accessList: [
          {
            address: contractAddress_JS,
            storageKeys: [
              "0x0000000000000000000000000000000000000000000000000000000000000000",
            ],
          },
        ],
    }
    // Sign the transaction
    const tx = new Tx(txObject, {chain:'Shardeum'})
    tx.sign(devTestnetPrivateKey)
    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')
    // Broadcast the transaction hash and check for errors
      web3.eth.sendSignedTransaction(raw, (err, txHash) => {
      console.log('err:', err, 'txHash:', txHash)
    })
  })
}

checkValueLatest();
createAndSendTx();
