const Web3 = require('web3')
const ethers = require("ethers")

const rpcURL = "https://liberty20.shardeum.org/"
const web3 = new Web3(rpcURL)

const provider = new ethers.providers.JsonRpcProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);
console.log("User wallet address: " + signer.address)

const contractAddress_JS = '0xb1fEf690f84241738b188eF8b88e52B2cc59AbD2'
const contractABI_JS = [{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"multiCallWrite","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"setCallOne","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"callContractToCall","outputs":[{"internalType":"contractcontractToCall","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"multiCallRead","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

createAndSendTx();

async function createAndSendTx() {

    const chainIdConnected = await web3.eth.getChainId();
    console.log("chainIdConnected: "+ chainIdConnected)

    const slot0 = await contractDefined_JS.methods.multiCallRead().call()
    console.log("slot0: "+ slot0)

    const contractOneAddress = await contractDefined_JS.methods.callContractToCall().call()
    console.log("contractOneAddress: "+ contractOneAddress)

    const codeHash = await provider.getCode(contractOneAddress)
    console.log("contractOneAddress codeHash: " + codeHash)

    const unixTime = Date.now();
    console.log("UNIX TIME: " + unixTime)

    const txCount = await provider.getTransactionCount(signer.address);

    const tx = signer.sendTransaction({
        chainId: chainIdConnected,
        to: contractAddress_JS,
        nonce:    web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(2100000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
        data: contractDefined_JS.methods.multiCallWrite(unixTime).encodeABI(),
        type: 1,
        accessList: [
          {
            address: contractOneAddress, //Contract address we are calling from the "to" contract at some point.
            storageKeys: [
              "0x0000000000000000000000000000000000000000000000000000000000000000",
              codeHash, //Code hash from EXTCODEHASH https://blog.finxter.com/how-to-find-out-if-an-ethereum-address-is-a-contract/
            ]
          }
        ]

    });

    console.log("WAIT FOR TX RECEIPT: ")
    await tx
    console.log("TX RECEIPT: ")
    console.log(tx)

}
