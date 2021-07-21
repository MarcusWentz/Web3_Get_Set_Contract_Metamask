//Define button click for opening Metamask
const ethereumButton = document.querySelector('.enableEthereumButton');
ethereumButton.addEventListener('click', () => {
  //Will Start the metamask extension
  ethereum.request({ method: 'eth_requestAccounts' });
});

//TRY THIS NEXT
//https://docs.metamask.io/guide/sending-transactions.html#example

const sendEthButton = document.querySelector('.sendEthButton');

let accounts = [];

//Sending Ethereum to an address
sendEthButton.addEventListener('click', () => {
  ethereum
    .request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: '0xc1202e7d42655F23097476f6D48006fE56d38d4f',
          value: '10', //msg.value!
          gasPrice: '0x09184e72a000',
          gas: '0x2710',
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error);
});

async function getAccount() {
  accounts = await ethereum.request({ method: 'eth_requestAccounts' });
}
