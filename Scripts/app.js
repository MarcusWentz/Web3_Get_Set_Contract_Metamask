//Metamask sending trasactions:
//https://docs.metamask.io/guide/sending-transactions.html#transaction-parameters

//Empty array to be filled once Metamask is called.
let accounts = [];
document.getElementById("getCurrentAccountConnected").innerHTML =  "None. Please click the top button to connect."

//If Metamask is not detected the user will be told to install Metamask.
function detectMetamaskInstalled(){
  try{
     ethereum.isMetaMask
  }
  catch(missingMetamask) {
     alert("Metamask not detected in browser! Install Metamask browser extension, then refresh page!")
  }
}

//Alert user to connect their Metamask address to the site before doing any transactions.
function checkAddressMissingMetamask() {
  if(accounts.length == 0) {
    alert("No address from Metamask found. Click the top button to connect your Metamask account then try again without refreshing the page.")
  }
}

//Function called for getting Metamask accounts on Goerli. Used in every button in case the user forgets to click the top button.
function enableMetamaskOnGoerli() {
  //Get account details from Metamask wallet.
  getAccount();
  //Check if user is on the Goerli testnet. If not, alert them to change to Goerli.
  if(window.ethereum.networkVersion != 5){
    alert("You are not on the Goerli Testnet! Please switch to Goerli and refresh page.")
  }
}

//When the page is opened check for error handling issues.
detectMetamaskInstalled()

//Connect to Metamask.
const ethereumButton = document.querySelector('.enableEthereumButton');
ethereumButton.addEventListener('click', () => {
    detectMetamaskInstalled()
    enableMetamaskOnGoerli()
});

async function getAccount() {
  accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  document.getElementById("getCurrentAccountConnected").innerHTML = accounts[0]
}

//Make Metamask the client side Web3 provider. Needed for tracking live events.
const web3 = new Web3(window.ethereum)
//Now build the contract with Web3.
const contractAddress_JS = '0xdbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37'
const contractABI_JS = [{"anonymous":false,"inputs":[],"name":"setEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

//Get the latest value.
contractDefined_JS.methods.storedData().call((err, balance) => {
  if(balance === undefined){
    document.getElementById("getValueStateSmartContract").innerHTML =  "Install Metamask and select Goerli Testnet to have a Web3 provider to read blockchain data."
  }
  else{
    document.getElementById("getValueStateSmartContract").innerHTML =  balance
  }
})

// MODIFY CONTRACT STATE WITH SET FUNCTION WITH PREDEFINED DATA FROM WEB3.JS
const changeStateInContractEvent = document.querySelector('.changeStateInContractEvent');
changeStateInContractEvent.addEventListener('click', () => {
  checkAddressMissingMetamask()
  //uint cannot be negative, force to absolute value.
  var inputContractText =  Math.abs(document.getElementById("setValueSmartContract").value);
  //Check if value is an integer. If not throw an error.
  if(Number.isInteger(inputContractText) == false){
    alert("Input value is not an integer! Only put an integer for input.")
  }
  ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: contractAddress_JS,
          data: contractDefined_JS.methods.set(inputContractText).encodeABI()
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
});

//Get the latest event. Once the event is triggered, website will update value.
contractDefined_JS.events.setEvent({
     fromBlock: 'latest'
 }, function(error, eventResult){})
 .on('data', function(eventResult){
   console.log(eventResult)
   //Call the get function to get the most accurate present state for the value.
   contractDefined_JS.methods.storedData().call((err, balance) => {
      document.getElementById("getValueStateSmartContract").innerHTML =  balance
     })
   })
 .on('changed', function(eventResult){
     // remove event from local database
 })
 .on('error', console.error);

 //Changing the integer state in a function which will fire off an event.
 //Make sure values are in hex or Metamask will fail to load.
 //DO NOT SET A VALUE UNLESS THE CONTRACT NEEDS IT FOR MSG.VALUE REQUIRE STATEMENTS
 const sendEthButton = document.querySelector('.sendEthButton');
 sendEthButton.addEventListener('click', () => {
   checkAddressMissingMetamask()
   ethereum
     .request({
       method: 'eth_sendTransaction',
       params: [
         {
           from: accounts[0],
           to: '0xc1202e7d42655F23097476f6D48006fE56d38d4f',
           value: '0x29a2241af62c0',
         },
       ],
     })
     .then((txHash) => console.log(txHash))
     .catch((error) => console.error);
 });
