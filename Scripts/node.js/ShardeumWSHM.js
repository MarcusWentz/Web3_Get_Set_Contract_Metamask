const Web3 = require('web3')
const ethers = require("ethers")

const rpcURL = "https://liberty20.shardeum.org/"
const web3 = new Web3(rpcURL)

const provider = new ethers.providers.JsonRpcProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);
console.log("User wallet address: " + signer.address)

const contractAddress_JS = '0x5A73a52A7F94cF58240eB52Bc80e57f280D54E3C'
const contractABI_JS = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"WSHM","outputs":[{"internalType":"contractinterfaceWSHM","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"multicallDeposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"approvedAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"multicallWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]

const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

createAndSendTx();

async function createAndSendTx() {

    const chainIdConnected = await web3.eth.getChainId();
    console.log("chainIdConnected: "+ chainIdConnected)

    const addressWSHM = await contractDefined_JS.methods.WSHM().call()

    const codeHash = await provider.getCode(addressWSHM)
    console.log("addressWSHM codeHash: " + codeHash)

    let txCount = await provider.getTransactionCount(signer.address);

    const depositTwoWeiTx = signer.sendTransaction({
        chainId: chainIdConnected,
        to: contractAddress_JS,
        nonce:    web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(2100000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
        data: contractDefined_JS.methods.multicallDeposit().encodeABI(),
        type: 1,
        value: 2,
        accessList: [
          {
            address: addressWSHM, //Contract address we are calling from the "to" contract at some point.
            storageKeys: [
              // "0x0000000000000000000000000000000000000000000000000000000000000000",
              codeHash, //Code hash from EXTCODEHASH https://blog.finxter.com/how-to-find-out-if-an-ethereum-address-is-a-contract/
            ]
          }
        ]

    });

    console.log("WAIT FOR TX RECEIPT: ")
    await depositTwoWeiTx
    console.log("TX RECEIPT: ")
    console.log(depositTwoWeiTx)

    // const txCount = await provider.getTransactionCount(signer.address);
    //
    // const withdrawOneWei = signer.sendTransaction({
    //     chainId: chainIdConnected,
    //     to: contractAddress_JS,
    //     nonce:    web3.utils.toHex(txCount),
    //     gasLimit: web3.utils.toHex(2100000), // Raise the gas limit to a much higher amount
    //     gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
    //     data: contractDefined_JS.methods.multicallWithdraw(signer.address, 1).encodeABI(),
    //     type: 1,
    //     accessList: [
    //       {
    //         address: addressWSHM, //Contract address we are calling from the "to" contract at some point.
    //         storageKeys: [
    //           // "0x0000000000000000000000000000000000000000000000000000000000000000",
    //           codeHash, //Code hash from EXTCODEHASH https://blog.finxter.com/how-to-find-out-if-an-ethereum-address-is-a-contract/
    //         ]
    //       }
    //     ]
    //
    // });
    //
    // console.log("WAIT FOR TX RECEIPT: ")
    // await withdrawOneWei
    // console.log("TX RECEIPT: ")
    // console.log(withdrawOneWei)

}
