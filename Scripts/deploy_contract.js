//Source material: https://www.dappuniversity.com/articles/web3-js-intro

//Need to import web3 Linux:
//sudo npm install web3

//RPC LOCAL [LIKE GANACHE], TESTNET [ACTUAL BLOCKCHAIN TO CONNECT TO LIKE RINKEBY]
var Tx = require("ethereumjs-tx").Transaction
const fs = require('fs');
const Web3 = require('web3')
//HIDE API KEY WITH "Linux Environment Variables" https://www.youtube.com/watch?v=himEMfYQJ1w
const rpcURL = process.env.rinkebyInfuraAPIKey // Your RPC URL goes here
const web3 = new Web3(rpcURL)
const devWalletaddress = '0xc1202e7d42655F23097476f6D48006fE56d38d4f' // Your account address goes here

//HIDE KEY WITH "Linux Environment Variables" https://www.youtube.com/watch?v=himEMfYQJ1w
const devTestnetPrivateKey = Buffer.from(process.env.devTestnetPrivateKey, 'hex')

function deployContract() {
   web3.eth.getTransactionCount(devWalletaddress, (err, txCount) => {
  //Data in this context is byte data from Remix compiler.
     const ByteData = '0x608060405234801561001057600080fd5b50606460008190555061014e806100286000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632a1afcd91461004657806360fe47b1146100645780636d4ce63c14610092575b600080fd5b61004e6100b0565b6040518082815260200191505060405180910390f35b6100906004803603602081101561007a57600080fd5b81019080803590602001909291905050506100b6565b005b61009a61010f565b6040518082815260200191505060405180910390f35b60005481565b806000819055503373ffffffffffffffffffffffffffffffffffffffff16427f23b4b512eee3e56a602299265da2e1ae5bf14e71a1b31985c23465515f321c9c836040518082815260200191505060405180910390a350565b6000805490509056fea2646970667358221220d4b8496ff6d65eacfd5e458b2f45ab73e4b5a68a0b0cc5f4f4167d443efe333d64736f6c634300060c0033'

     const txObject = {
       nonce:    web3.utils.toHex(txCount),
       gasLimit: web3.utils.toHex(1000000), // Raise the gas limit to a much higher amount
       gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
       data: ByteData
      }
      // Sign the transaction
      const tx = new Tx(txObject, {chain:'rinkeby'})
      tx.sign(devTestnetPrivateKey)
      const serializedTx = tx.serialize()
      const raw = '0x' + serializedTx.toString('hex')
      // Broadcast the transaction hash and check for errors
        web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('err:', err, 'txHash:', txHash)
      })
   })
}

deployContract()
