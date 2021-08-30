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
     const ByteData = '0x608060405234801561001057600080fd5b50610112806100206000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80632a1afcd914603757806360fe47b1146053575b600080fd5b603d607e565b6040518082815260200191505060405180910390f35b607c60048036036020811015606757600080fd5b81019080803590602001909291905050506084565b005b60005481565b806000819055503373ffffffffffffffffffffffffffffffffffffffff16427f23b4b512eee3e56a602299265da2e1ae5bf14e71a1b31985c23465515f321c9c836040518082815260200191505060405180910390a35056fea265627a7a72315820e0fa47b11081ad297406eea83546799e95b8bbfd6352d935a1920aef86f550e764736f6c63430005110032'

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
