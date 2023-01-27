//Metamask sending trasactions:
//https://docs.metamask.io/guide/sending-transactions.html#transaction-parameters

//Empty array to be filled once Metamask is called.
let accounts = [];
document.getElementById("enableEthereumButton").innerHTML =  "Connect Metamask 🦊"

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
async function enableMetamaskOnGoerli() {
  //Get account details from Metamask wallet.
  getAccount();
  //Check if user is on the Goerli testnet. If not, alert them to change to Goerli.
  const goerliChainId = 5;
  if(window.ethereum.networkVersion != goerliChainId){
    // alert("You are not on the Goerli Testnet! Please switch to Goerli and refresh page.")
    try{
      await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{
             chainId: "0x5"
          }]
        })
    } catch (error) {
      alert("Failed to add the network at chainId " + goerliChainId + " with wallet_addEthereumChain request. Add the network with https://chainlist.org/ or do it manually. Error log: " + error.message)
    }
  }
}

//When the page is opened check for error handling issues.
detectMetamaskInstalled()

//Connect to Metamask.
const ethereumButton = document.querySelector('#enableEthereumButton');
ethereumButton.addEventListener('click', () => {
    detectMetamaskInstalled()
    enableMetamaskOnGoerli()
});

async function getAccount() {
  accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  document.getElementById("enableEthereumButton").innerText = accounts[0].substr(0,5) + "..." +  accounts[0].substr(38,4)  
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
  
  //Take input as a string to handle bigNumber values.
  var inputContractText = document.getElementById("setValueSmartContract").value.toString();
 
  if(/^\d+$/.test(inputContractText)) {
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
  } else {
      alert("Can only accept numeric characters.")
  }

  
    
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

