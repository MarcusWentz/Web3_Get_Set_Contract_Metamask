const Web3 = require('web3')
const ethers = require("ethers")

const rpcURL = "https://liberty20.shardeum.org/"
const web3 = new Web3(rpcURL)

const provider = new ethers.providers.JsonRpcProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);
console.log("User wallet address: " + signer.address)

const transferToWallet = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKeyTwo, 'hex'), provider);
console.log("transferToWallet address: " + transferToWallet.address)

createAndSendTx();

async function createAndSendTx() {

    const chainIdConnected = await web3.eth.getChainId();
    console.log("chainIdConnected: "+ chainIdConnected)

    const oneEtherInWeiSHM = "1000000000000000000"
    console.log("oneEtherInWeiSHM: " + oneEtherInWeiSHM)

    const userBalance = await provider.getBalance(signer.address);
    console.log("User Balance [Shardeum SHM]" )
    console.log(ethers.utils.formatEther(userBalance))

    const receiverBalance = await provider.getBalance(transferToWallet.address);
    console.log("Receiver Balance [Shardeum SHM]" )
    console.log(ethers.utils.formatEther(receiverBalance))

    const txCount = await provider.getTransactionCount(signer.address);

    const tx = signer.sendTransaction({
          chainId: chainIdConnected,
          to: transferToWallet.address,
          nonce:    web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(300000), // Raise the gas limit to a much higher amount
          gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
          value: oneEtherInWeiSHM,
          type: 1,
          accessList: [
            {
              address: transferToWallet.address,
              storageKeys: []
            }
          ]

    });

    console.log("WAIT FOR TX RECEIPT: ")
    await tx
    console.log("TX RECEIPT: ")
    console.log(tx)

}
