const Web3 = require('web3')
const ethers = require("ethers")

// const rpcURL = "https://liberty20.shardeum.org/"
// const rpcURL = "https://liberty10.shardeum.org/"
const rpcURL = process.env.shardeumTestnetNodeHTTP
const web3 = new Web3(rpcURL)

const provider = new ethers.providers.JsonRpcProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.shardeumTestnetPrivateKey, 'hex'), provider);
console.log("User wallet address: " + signer.address)

const simpleStorageAddress = '0x813E06a1A63Ff93ACBB34e41e053D0B819092339'
const simpleStorageABI = [{"anonymous":false,"inputs":[],"name":"setEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const simpleStorageDeployed = new web3.eth.Contract(simpleStorageABI, simpleStorageAddress)

createAndSendTx();

async function createAndSendTx() {

    const chainIdConnected = await web3.eth.getChainId();
    console.log("chainIdConnected: "+ chainIdConnected)

    const userBalance = await provider.getBalance(signer.address);
    console.log("User Balance [Shardeum SHM]" )
    console.log(ethers.utils.formatEther(userBalance))

    let blockNumber = await web3.eth.getBlockNumber();
    console.log("blockNumber: "+ blockNumber)


    // const slot0 = await simpleStorageDeployed.methods.storedData().call()
    // console.log("slot0: "+ slot0)

    // const slot0 = await simpleStorageDeployed.methods.storedData().call()
    // console.log("slot0: "+ slot0)

    const unixTime = Date.now();
    console.log("UNIX TIME: " + unixTime)

    const txCount = await provider.getTransactionCount(signer.address);

    // const tx = signer.sendTransaction({
    //       chainId: chainIdConnected,
    //       to: simpleStorageAddress,
    //       nonce:    web3.utils.toHex(txCount),
    //       gasLimit: web3.utils.toHex(300000), // Raise the gas limit to a much higher amount
    //       gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
    //       data: simpleStorageDeployed.methods.set(unixTime).encodeABI(),
    //       type: 1,
    //       accessList: [
    //         {
    //           address: simpleStorageAddress,
    //           storageKeys: [
    //             "0x0000000000000000000000000000000000000000000000000000000000000000",
    //           ]
    //         }
    //       ]
    //
    // });
    //
    // console.log("WAIT FOR TX RECEIPT: ")
    // await tx
    // console.log("TX RECEIPT: ")
    // console.log(tx)

    // Useful for raw unsigned transactions.
    const contracDeployedWithEthersProvider = new ethers.Contract(simpleStorageAddress, simpleStorageABI, provider);
    let unsignedTx = await contracDeployedWithEthersProvider.populateTransaction.set("6");
    console.log(unsignedTx)
    let chainIdCallRPC = await provider.send('eth_chainId')
    console.log(chainIdCallRPC)
    // let predictedAccessList = await provider.send('eth_getAccessList', [unsignedTx])
    // console.log(predictedAccessList)
    // let tx = await signer.sendTransaction(unsignedTx);
    // console.log(tx)

}
