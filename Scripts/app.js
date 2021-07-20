//Define button click for opening Metamask
const ethereumButton = document.querySelector('.enableEthereumButton');
ethereumButton.addEventListener('click', () => {
  //Will Start the metamask extension
  ethereum.request({ method: 'eth_requestAccounts' });
});
