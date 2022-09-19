const Web3 = require('web3')
var Tx = require("ethereumjs-tx")

const rpcURL = "https://liberty20.shardeum.org/"
const web3 = new Web3(rpcURL)

console.log("chainId:")
web3.eth.getChainId().then(console.log);

const devTestnetPrivateKey = Buffer.from(process.env.devTestnetPrivateKey, 'hex')
const devWalletAddress = web3.eth.accounts.privateKeyToAccount(process.env.devTestnetPrivateKey).address;

const contractAddress_JS = '0x41Ae7549023a7F0b6Cb7FE4d1807487b18cbAe10'
const contractABI_JS = [{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"multiCall","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"setCallOne","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"callContractToCall","outputs":[{"internalType":"contractcontractToCall","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

// const codeHashMap: any = new Map();

function createAndSendTx() {
    let contractOneAddress;
    // let contractTwoAddress;

    contractDefined_JS.methods.callContractToCall().call((err, getCallContractToCall) => {
      console.log({ err, getCallContractToCall })
      contractOneAddress = getCallContractToCall;
      //0xE8eb488bEe284ed5b9657D5fc928f90F40BC2d57
    })

    // contractDefined_JS.methods.callContractTwo().call((err, getcallContractTwo) => {
    //   console.log({ err, getcallContractTwo })
    //   contractTwoAddress = getcallContractTwo;
    // })

    const unixTIme = Date.now();
    web3.eth.getTransactionCount(devWalletAddress, (err, txCount) => {
      const txObject = {
        nonce:    web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(2100000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
        to: contractAddress_JS,
        // data: contractDefined_JS.methods.multiCall(unixTIme).encodeABI(),
        data: contractDefined_JS.methods.multiCall(444).encodeABI(),
        type: 1,
        accessList: [
          // {
          //     address : devWalletAddress,
          //     storageKeys: [],
          // },
          // {
          //   address: contractAddress_JS,
          //   storageKeys: [
          //     "0x0000000000000000000000000000000000000000000000000000000000000000",
          //   ],
          // },
          {
            address: contractOneAddress,
            storageKeys: [
              "0x0000000000000000000000000000000000000000000000000000000000000000",
              "0x6ad388c3c3423bab3b6a72664273d2db94b96db28c3dcb552398a88ee5fa8d1b" //Code hash from EXTCODEHASH https://blog.finxter.com/how-to-find-out-if-an-ethereum-address-is-a-contract/
            ]
          }
        ]
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

createAndSendTx();
