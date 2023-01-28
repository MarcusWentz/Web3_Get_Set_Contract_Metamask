//Metamask sending trasactions:
//https://docs.metamask.io/guide/sending-transactions.html#transaction-parameters

detectMetamaskInstalled() //When the page is opened check for error handling issues.

let accounts = []; ////Empty array to be filled once Metamask is called.
document.getElementById("enableEthereumButton").innerHTML =  "Connect Metamask 🦊"

const goerliChainId = 5;

const provider = new ethers.providers.Web3Provider(window.ethereum); //Imported ethers from index.html with "<script src="https://cdn.ethers.io/lib/ethers-5.6.umd.min.js" type="text/javascript"></script>".
const signer = provider.getSigner();
const contractAddress_JS = '0xdbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37'
const contractABI_JS = [{"anonymous":false,"inputs":[],"name":"setEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

const contractDefined_JS = new ethers.Contract(contractAddress_JS, contractABI_JS, signer);

getDataOnChainToLoad()

async function getDataOnChainToLoad(){
  let chainIdConnected = await getChainIdConnected();

  if(chainIdConnected == goerliChainId){
    getStoredData()
  }
  if(chainIdConnected != goerliChainId){
    document.getElementById("getValueStateSmartContract").innerHTML =  "Install Metamask and select Goerli Testnet to have a Web3 provider to read blockchain data."
  }

}

async function getStoredData() {
  let storedDataCallValue = await contractDefined_JS.storedData()
  if(storedDataCallValue === undefined){
    document.getElementById("getValueStateSmartContract").innerHTML =  "Install Metamask and select Goerli Testnet to have a Web3 provider to read blockchain data."
  }
  else{
    document.getElementById("getValueStateSmartContract").innerHTML =  storedDataCallValue
  }
}

async function sentTxAsync(x) {

  const callDataObject = await contractDefined_JS.populateTransaction.set(x);
  const txData = callDataObject.data;

  ethereum
  .request({
    method: 'eth_sendTransaction',
    params: [
      {
        from: accounts[0],
        to: contractAddress_JS,
        data: txData
      },
    ],
  })
  .then((txHash) => console.log(txHash))
  .catch((error) => console.error);  
    
}

contractDefined_JS.on("setEvent", () => {

  getStoredData()

});

//Connect to Metamask.
const ethereumButton = document.querySelector('#enableEthereumButton');
ethereumButton.addEventListener('click', () => {
    detectMetamaskInstalled()
    enableMetamaskOnGoerli()
});

// MODIFY CONTRACT STATE WITH SET FUNCTION WITH PREDEFINED DATA FROM WEB3.JS
const changeStateInContractEvent = document.querySelector('.changeStateInContractEvent');
changeStateInContractEvent.addEventListener('click', () => {
  checkAddressMissingMetamask()
  
  var inputContractText = document.getElementById("setValueSmartContract").value.toString();

  if(/^\d+$/.test(inputContractText)==false) {
    alert("Can only accept numeric characters.")
    return
  }

  sentTxAsync(inputContractText)

})

//If Metamask is not detected the user will be told to install Metamask.
function detectMetamaskInstalled(){
  try{
     ethereum.isMetaMask
  }
  catch(missingMetamask) {
     alert("Metamask not detected in browser! Install Metamask browser extension, then refresh page!")
     document.getElementById("getValueStateSmartContract").innerHTML =  "Install Metamask and select Goerli Testnet to have a Web3 provider to read blockchain data."

  }

}

//Alert user to connect their Metamask address to the site before doing any transactions.
function checkAddressMissingMetamask() {
  if(accounts.length == 0) {
    alert("No address from Metamask found. Click the top button to connect your Metamask account then try again without refreshing the page.")
  }
}

async function getChainIdConnected() {

  const connectedNetworkObject = await provider.getNetwork();
  const chainIdConnected = connectedNetworkObject.chainId;
  return chainIdConnected

}

async function getAccount() {
  accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  document.getElementById("enableEthereumButton").innerText = accounts[0].substr(0,5) + "..." +  accounts[0].substr(38,4)  
}

async function enableMetamaskOnGoerli() {
  //Get account details from Metamask wallet.
  getAccount();
  //Check if user is on the Goerli testnet. If not, alert them to change to Goerli.
  if(window.ethereum.networkVersion != goerliChainId){
    // alert("You are not on the Goerli Testnet! Please switch to Goerli and refresh page.")
    try{
      await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{
             chainId: "0x5"
          }]
        })
      location.reload(); 
      // alert("Failed to add the network at chainId " + goerliChainId + " with wallet_addEthereumChain request. Add the network with https://chainlist.org/ or do it manually. Error log: " + error.message)
    } catch (error) {
      alert("Failed to add the network at chainId " + goerliChainId + " with wallet_addEthereumChain request. Add the network with https://chainlist.org/ or do it manually. Error log: " + error.message)
    }
  }
}