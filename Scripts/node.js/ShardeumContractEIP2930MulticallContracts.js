const Web3 = require('web3')
var Tx = require("ethereumjs-tx")

const rpcURL = "https://liberty20.shardeum.org/"
const web3 = new Web3(rpcURL)

console.log("chainId:")
web3.eth.getChainId().then(console.log);

const devTestnetPrivateKey = Buffer.from(process.env.devTestnetPrivateKey, 'hex')
const devWalletAddress = web3.eth.accounts.privateKeyToAccount(process.env.devTestnetPrivateKey).address;

const contractAddress_JS = '0xfE854EB335786037aDb33C36936f679CA127C3CD'
const contractABI_JS = [{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"multiCall","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"setCallOne","type":"address"},{"internalType":"address","name":"setCallTwo","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"callContractOne","outputs":[{"internalType":"contractOne","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"callContractTwo","outputs":[{"internalType":"contractTwo","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"slot0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"slot1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"slot2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

function checkValueLatest() {
  contractDefined_JS.methods.slot2().call((err, balance) => {
    console.log({ err, balance })
  })
}

function createAndSendTx() {
    let contractOneAddress;
    let contractTwoAddress;

    contractDefined_JS.methods.callContractOne().call((err, getcallContractOne) => {
      console.log({ err, getcallContractOne })
      contractOneAddress = getcallContractOne;
    })

    contractDefined_JS.methods.callContractTwo().call((err, getcallContractTwo) => {
      console.log({ err, getcallContractTwo })
      contractTwoAddress = getcallContractTwo;
    })

    const unixTIme = Date.now();
    web3.eth.getTransactionCount(devWalletAddress, (err, txCount) => {
      const txObject = {
        nonce:    web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(300000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
        to: contractAddress_JS,
        data: contractDefined_JS.methods.multiCall(unixTIme).encodeABI(),
        accessList: [
          {
            address: contractAddress_JS,
            storageKeys: [
              "0x0000000000000000000000000000000000000000000000000000000000000002",
            ],
          },
          {
            address: contractOneAddress,
            storageKeys: [
              "0x0000000000000000000000000000000000000000000000000000000000000000",
            ],
          },
          {
            address: contractTwoAddress,
            storageKeys: [
              "0x0000000000000000000000000000000000000000000000000000000000000001",
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
