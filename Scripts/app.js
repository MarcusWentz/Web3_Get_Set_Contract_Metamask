//Metamask sending trasactions:
//https://docs.metamask.io/guide/sending-transactions.html#transaction-parameters

const ethereumButton = document.querySelector('.enableEthereumButton');
const sendEthButton = document.querySelector('.sendEthButton');
let accounts = [];

//If Metamask is not detected the user will be told to install Metamask.
try{
   ethereum.isMetaMask
}
catch(error) {
   alert("Metamask not detected in browser! Install Metamask browser extension, then refresh page! Error log: " + error)
}

//If Metamask is installed but
try {
  console.log(accounts)
}
catch(error) {
  alert.log("Welcome. Metamask is installed but not connected yet. Please click the top button to connect Metamask to this site. Account error: " + error)
}

ethereumButton.addEventListener('click', () => {
  getAccount();
  //Check if user is on the Rinkeby testnet. If not, alert them to change to Rinkeby.
  if(window.ethereum.networkVersion != 4){
    alert("You are not on the Rinkeby Testnet! Please switch to Rinkeby and refresh page.")
  }
});

async function getAccount() {
  accounts = await ethereum.request({ method: 'eth_requestAccounts' });
}

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

// MODIFY CONTRACT STATE WITH SET FUNCTION WITH PREDEFINED DATA FROM WEB3.JS
const changeStateInContractEvent = document.querySelector('.changeStateInContractEvent');
changeStateInContractEvent.addEventListener('click', () => {
  //uint cannot be negative, force to absolute value.
  var inputContractText =  Math.abs(document.getElementById("setValueSmartContract").value);
  ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: '0x6B6a427CaCc6adB23117ff4EFef5e6365617bA94',
          gasPrice: '2540be400',
          gas:  'C3500',
          data: contractDefined_JS.methods.set(inputContractText).encodeABI()
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
});

//Make Metamask the client side Web3 provider.
const web3 = new Web3(window.ethereum)
//Now build the contract with Web3.
const contractAddress_JS = '0x6B6a427CaCc6adB23117ff4EFef5e6365617bA94'
const contractABI_JS =
[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"date","type":"uint256"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"valueChangeEventWenjs","type":"uint256"}],"name":"setValueUpdatedViaWebjs","type":"event"},{"inputs":[],"name":"get","outputs":[{"internalType":"uint256","name":"retVal","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

//Get the latest value.
contractDefined_JS.methods.get().call((err, balance) => {
  document.getElementById("getValueStateSmartContract").innerHTML =  balance
})

//Get the latest event. Once the event is triggered, website will update value.
contractDefined_JS.events.setValueUpdatedViaWebjs({
     fromBlock: 'latest'
 }, function(error, eventResult){})
 .on('data', function(eventResult){
   console.log(eventResult)
   //Call the get function to get the most accurate present state for the value.
   contractDefined_JS.methods.get().call((err, balance) => {
      document.getElementById("getValueStateSmartContract").innerHTML =  balance
     })
   })
 .on('changed', function(eventResult){
     // remove event from local database
 })
 .on('error', console.error);
