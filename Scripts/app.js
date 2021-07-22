//Metamask sending trasactions:
//https://docs.metamask.io/guide/sending-transactions.html#transaction-parameters

const ethereumButton = document.querySelector('.enableEthereumButton');
const sendEthButton = document.querySelector('.sendEthButton');

let accounts = [];

//Changing the integer state in a function which will fire off an event.
//Make sure values are in hex or Metamask will fail to load.
//DO NOT SET A VALUE UNLESS THE CONTRACT NEEDS IT FOR MSG.VALUE REQUIRE STATEMENTS
sendEthButton.addEventListener('click', () => {
  ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: '0xc1202e7d42655F23097476f6D48006fE56d38d4f',
          value: '0x29a2241af62c0',
          gasPrice: '0x5F0000000',
          gas: '0x5208',
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
});

ethereumButton.addEventListener('click', () => {
  getAccount();
});

async function getAccount() {
  accounts = await ethereum.request({ method: 'eth_requestAccounts' });
}

// //TESTING WEB3 FOR CALLING INFO /////////////////////////////////////////////////
// var Tx = require("ethereumjs-tx").Transaction
// const fs = require('fs');
// const Web3 = require('web3')
// const rpcURL = 'https://rinkeby.infura.io/v3/e9520f17b0944cb08b00710d60ff34ac' // Your RPC URL goes here
// const web3 = new Web3(rpcURL)
//
// //HIDE KEY WITH "Linux Environment Variables" https://www.youtube.com/watch?v=himEMfYQJ1w
// const contractAddress_JS = '0x6B6a427CaCc6adB23117ff4EFef5e6365617bA94'
// const contractABI_JS = //[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"get","outputs":[{"internalType":"uint256","name":"retVal","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
// [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"date","type":"uint256"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"valueChangeEventWenjs","type":"uint256"}],"name":"setValueUpdatedViaWebjs","type":"event"},{"inputs":[],"name":"get","outputs":[{"internalType":"uint256","name":"retVal","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
// const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)
//
// //Check if value was set
// function checkValueLatest() {
//   contractDefined_JS.methods.get().call((err, balance) => {
//     console.log({ err, balance })
//   })
// }

const changeStateInContractEvent = document.querySelector('.changeStateInContractEvent');
changeStateInContractEvent.addEventListener('click', () => {
  ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: '0x6B6a427CaCc6adB23117ff4EFef5e6365617bA94',
          gasPrice: '2540be400',
          gas:  'C3500',
          data: '0x60fe47b100000000000000000000000000000000000000000000000000000000000003e7'
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
});
