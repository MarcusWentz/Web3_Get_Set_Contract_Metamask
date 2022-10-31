const Web3 = require('web3')
const ethers = require("ethers")

// const rpcURL = "https://liberty20.shardeum.org/"
// const rpcURL = "https://liberty10.shardeum.org/"
const rpcURL = process.env.shardeumTestnetNodeHTTP
const web3 = new Web3(rpcURL)

const provider = new ethers.providers.JsonRpcProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.shardeumTestnetPrivateKey, 'hex'), provider);
console.log("User wallet address: " + signer.address)

const simpleStorageAddress = '0x80e293fC7a3338dC18F06917dbab58Fc921B1bb3'
const simpleStorageABI = [{"anonymous":false,"inputs":[],"name":"setEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const simpleStorageDeployed = new web3.eth.Contract(simpleStorageABI, simpleStorageAddress)

// createAndSendTxTransfer();
// deploySimpleStorage();
updateStorageSlot();

async function createAndSendTxTransfer() {

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

    // Useful for raw unsigned transactions.
    // const contracDeployedWithEthersProvider = new ethers.Contract(simpleStorageAddress, simpleStorageABI, provider);
    // let unsignedTx = await contracDeployedWithEthersProvider.populateTransaction.set("6");
    // console.log(unsignedTx)
    // let chainIdCallRPC = await provider.send('eth_chainId')
    // console.log(chainIdCallRPC)
    //
    // let predictedAccessList = await provider.send('eth_getAccessList', [unsignedTx])
    // console.log(predictedAccessList)
    // let tx = await signer.sendTransaction(unsignedTx);
    // console.log(tx)

    const txCount = await provider.getTransactionCount(signer.address);

    const tx = signer.sendTransaction({
          chainId: chainIdConnected,
          // to: simpleStorageAddress,
          to: "0x407D73d8a49eeb85D32Cf465507dd71d507100c1",
          nonce:    web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(300000), // Raise the gas limit to a much higher amount
          gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
          // data: simpleStorageDeployed.methods.set(unixTime).encodeABI(),
          value: "0x14D1120D7B160000", //1.5 ether
          // type: 1,
          // accessList: [
          //   {
          //     address: simpleStorageAddress,
          //     storageKeys: [
          //       "0x0000000000000000000000000000000000000000000000000000000000000000",
          //     ]
          //   }
          // ]

    });

    console.log("WAIT FOR TX RECEIPT: ")
    await tx
    console.log("TX RECEIPT: ")
    console.log(tx)

}


async function deploySimpleStorage() {


  const bytecode = "0x608060405234801561001057600080fd5b50610179806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632a1afcd91461003b57806360fe47b114610059575b600080fd5b610043610075565b60405161005091906100ca565b60405180910390f35b610073600480360381019061006e9190610116565b61007b565b005b60005481565b806000819055507f24a4f809cc1bf5b0f3c16b615535b56a0b583b1630e06e32b46b759b8088a95d60405160405180910390a150565b6000819050919050565b6100c4816100b1565b82525050565b60006020820190506100df60008301846100bb565b92915050565b600080fd5b6100f3816100b1565b81146100fe57600080fd5b50565b600081359050610110816100ea565b92915050565b60006020828403121561012c5761012b6100e5565b5b600061013a84828501610101565b9150509291505056fea2646970667358221220f95299a7647123a064e990ec26a1b2ed2c8c23e49203ced8ad9e3fdc89fe67f264736f6c634300080f0033"
// A Human-Readable ABI; we only need to specify relevant fragments,
// in the case of deployment this means the constructor
const abi = []
const factory = new ethers.ContractFactory(abi, bytecode, signer)

// Deploy, setting total supply to 100 tokens (assigned to the deployer)
const contract = await factory.deploy();

// The contract is not currentl live on the network yet, however
// its address is ready for us
console.log("Contract deployed at: " + contract.address)
// '0xff04b6fBd9FEcbcac666cc0FFfEed58488c73c7B'

// Wait until the contract has been deployed before interacting
// with it; returns the receipt for the deployemnt transaction
await contract.deployTransaction.wait();


}

async function updateStorageSlot() {

    const chainIdConnected = await web3.eth.getChainId();
    console.log("chainIdConnected: "+ chainIdConnected)

    const userBalance = await provider.getBalance(signer.address);
    console.log("User Balance [Shardeum SHM]" )
    console.log(ethers.utils.formatEther(userBalance))

    let blockNumber = await web3.eth.getBlockNumber();
    console.log("blockNumber: "+ blockNumber)


    const slot0 = await simpleStorageDeployed.methods.storedData().call()
    console.log("slot0: "+ slot0)

    // const slot0 = await simpleStorageDeployed.methods.storedData().call()
    // console.log("slot0: "+ slot0)

    const unixTime = Date.now();
    console.log("UNIX TIME: " + unixTime)

    // Useful for raw unsigned transactions.
    const contracDeployedWithEthersProvider = new ethers.Contract(simpleStorageAddress, simpleStorageABI, provider);
    let unsignedTx = await contracDeployedWithEthersProvider.populateTransaction.set("6");
    console.log(unsignedTx)
    let chainIdCallRPC = await provider.send('eth_chainId')
    console.log(chainIdCallRPC)
    //
    // const txCount = await provider.getTransactionCount(signer.address);

    let predictedAccessList = await provider.send('eth_getAccessList', [unsignedTx])
    // console.log(predictedAccessList)
    // let tx = await signer.sendTransaction(unsignedTx);
    // console.log(tx)

    // const txCount = await provider.getTransactionCount(signer.address);
    //
    // const tx = signer.sendTransaction({
    //       chainId: chainIdConnected,
    //       to: simpleStorageAddress,
    //       nonce:    web3.utils.toHex(txCount),
    //       gasLimit: web3.utils.toHex(300000), // Raise the gas limit to a much higher amount
    //       gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
    //       data: simpleStorageDeployed.methods.set(unixTime).encodeABI(),
    //       // type: 1,
    //       // accessList: [
    //       //   {
    //       //     address: simpleStorageAddress,
    //       //     storageKeys: [
    //       //       "0x0000000000000000000000000000000000000000000000000000000000000000",
    //       //     ]
    //       //   }
    //       // ]
    //
    // });

    // console.log("WAIT FOR TX RECEIPT: ")
    // await tx
    // console.log("TX RECEIPT: ")
    // console.log(tx)

}
