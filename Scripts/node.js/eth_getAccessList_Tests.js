const Web3 = require('web3')
const ethers = require("ethers")

// const rpcURL = "https://liberty20.shardeum.org/"
// const rpcURL = "https://liberty10.shardeum.org/"
const rpcURL = process.env.shardeumTestnetNodeHTTP
const web3 = new Web3(rpcURL)

const provider = new ethers.providers.JsonRpcProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.shardeumTestnetPrivateKey, 'hex'), provider);
console.log("User wallet address: " + signer.address)

const simpleStorageAddress = '0xbbC528D2c94e1c8A83Ff2a8C5be45eF5c125d738'
const simpleStorageABI = [{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"slot0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const simpleStorageDeployed = new web3.eth.Contract(simpleStorageABI, simpleStorageAddress)

const multiCallStorageAddress = '0xc1C142BB59E0BD248Cde7Be0c18Ad47F2236C0c8'
const multiCallStorageABI =
[{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"multiCallWrite","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"setCallOne","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"callContractToCall","outputs":[{"internalType":"contractcontractToCall","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"multiCallRead","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const multiCallStorageDeployed = new web3.eth.Contract(multiCallStorageABI, multiCallStorageAddress)

const tokenErc20Address = "0x45cbBAEe7A8015748AFb2fAEeE1c94A57cA55B54"
const tokenErc20ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
const tokenErc20Deployed = new web3.eth.Contract(tokenErc20ABI, tokenErc20Address)

const bugTestEC20Address = "0x1493e0c29F214894B6B23c97d186DF2FE9611888"
const bugTestEC20ABI = [{"inputs":[],"name":"transferBothTests","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"transferFromTest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"transferTest","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"tokenObject","outputs":[{"internalType":"contractERC20TokenContract","name":"","type":"address"}],"stateMutability":"view","type":"function"}]
const bugTestEC20Deployed = new web3.eth.Contract(bugTestEC20ABI, bugTestEC20Address)

const timeMilliSec = 1000;

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}

// createAndSendTxTransfer();

// deploySimpleStorage();

// updateStorageSlot();
// multiCallUpdateStorageSlot();

// bugTestEC20Transfer();
// bugTestEC20TransferFrom();
bugTestEC20TransferBothTests();

async function createAndSendTxTransfer() {

    const chainIdConnected = await web3.eth.getChainId();
    console.log("chainIdConnected: "+ chainIdConnected)

    const userBalance = await provider.getBalance(signer.address);
    console.log("User Balance [Shardeum SHM]" )
    console.log(ethers.utils.formatEther(userBalance))

    let blockNumber = await web3.eth.getBlockNumber();
    console.log("blockNumber: "+ blockNumber)

    const txCount = await provider.getTransactionCount(signer.address);

    const tx = signer.sendTransaction({
          chainId: chainIdConnected,
          to: "0x407D73d8a49eeb85D32Cf465507dd71d507100c1",
          nonce:    web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(300000), // Raise the gas limit to a much higher amount
          gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
          value: "0x14D1120D7B160000", //1.5 ether
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

  // await contract.deployTransaction.wait();

}

async function updateStorageSlot() {

    const chainIdConnected = await web3.eth.getChainId();
    console.log("chainIdConnected: "+ chainIdConnected)

    const userBalance = await provider.getBalance(signer.address);
    console.log("User Balance [Shardeum SHM]" )
    console.log(ethers.utils.formatEther(userBalance))

    let blockNumber = await web3.eth.getBlockNumber();
    console.log("blockNumber: "+ blockNumber)

    const slot0 = await simpleStorageDeployed.methods.slot0().call()
    console.log("slot0: "+ slot0)

    const unixTime = Date.now();
    console.log("UNIX TIME: " + unixTime)

    // // Useful for raw unsigned transactions.
    const contracDeployedWithEthersProvider = new ethers.Contract(simpleStorageAddress, simpleStorageABI, signer);
    let unsignedTx = await contracDeployedWithEthersProvider.populateTransaction.set(unixTime);
    console.log(unsignedTx)

    // let chainIdCallRPC = await provider.send('eth_chainId')
    // console.log(chainIdCallRPC)

    let predictedAccessList = await provider.send('eth_getAccessList', [unsignedTx])
    console.log(predictedAccessList)

    const txCount = await provider.getTransactionCount(signer.address);

    const tx = signer.sendTransaction({
          chainId: chainIdConnected,
          to: simpleStorageAddress,
          nonce:    web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(300000), // Raise the gas limit to a much higher amount
          gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
          data: simpleStorageDeployed.methods.set(unixTime).encodeABI(),
          type: 1,
          accessList: predictedAccessList
    });

    console.log("WAIT FOR TX RECEIPT: ")
    await tx
    console.log("TX RECEIPT: ")
    console.log(tx)

}

async function multiCallUpdateStorageSlot() {

    const chainIdConnected = await web3.eth.getChainId();
    console.log("chainIdConnected: "+ chainIdConnected)

    const userBalance = await provider.getBalance(signer.address);
    console.log("User Balance [Shardeum SHM]" )
    console.log(ethers.utils.formatEther(userBalance))

    let blockNumber = await web3.eth.getBlockNumber();
    console.log("blockNumber: "+ blockNumber)

    const slot0 = await multiCallStorageDeployed.methods.multiCallRead().call()
    console.log("slot0: "+ slot0)

    const unixTime = Date.now();
    console.log("UNIX TIME: " + unixTime)

    // // Useful for raw unsigned transactions.
    const contracDeployedWithEthersProvider = new ethers.Contract(multiCallStorageAddress, multiCallStorageABI, signer);
    let unsignedTx = await contracDeployedWithEthersProvider.populateTransaction.multiCallWrite(unixTime);
    console.log(unsignedTx)

    // let chainIdCallRPC = await provider.send('eth_chainId')
    // console.log(chainIdCallRPC)

    let predictedAccessList = await provider.send('eth_getAccessList', [unsignedTx])
    console.log(predictedAccessList)

    const txCount = await provider.getTransactionCount(signer.address);

    const tx = signer.sendTransaction({
          chainId: chainIdConnected,
          to: multiCallStorageAddress,
          nonce:    web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(300000), // Raise the gas limit to a much higher amount
          gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
          data: simpleStorageDeployed.methods.set(unixTime).encodeABI(),
          type: 1,
          accessList: predictedAccessList
    });

    console.log("WAIT FOR TX RECEIPT: ")
    await tx
    console.log("TX RECEIPT: ")
    console.log(tx)

}

async function bugTestEC20Transfer() {

    const chainIdConnected = await web3.eth.getChainId();
    console.log("chainIdConnected: "+ chainIdConnected)

    const userBalance = await provider.getBalance(signer.address);
    console.log("User Balance [Shardeum SHM]" )
    console.log(ethers.utils.formatEther(userBalance))

    let blockNumber = await web3.eth.getBlockNumber();
    console.log("blockNumber: "+ blockNumber)

		let balanceOfSigner = await tokenErc20Deployed.methods.balanceOf(signer.address).call()
		console.log("balanceOfSigner: "+ balanceOfSigner)

		// Send 1 ether token.
		let contracDeployedWithEthersProvider = new ethers.Contract(tokenErc20Address, tokenErc20ABI, signer);
		let unsignedTx = await contracDeployedWithEthersProvider.populateTransaction.transfer(bugTestEC20Address,"1000000000000000000");
		console.log(unsignedTx)
		// let chainIdCallRPC = await provider.send('eth_chainId')
		// console.log(chainIdCallRPC)

		let predictedAccessList = await provider.send('eth_getAccessList', [unsignedTx])
		console.log(predictedAccessList)

		let txCount = await provider.getTransactionCount(signer.address);

    let tx = signer.sendTransaction({
          chainId: chainIdConnected,
          to: tokenErc20Address,
          nonce:    web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(300000), // Raise the gas limit to a much higher amount
          gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
          data: tokenErc20Deployed.methods.transfer(bugTestEC20Address,"1000000000000000000").encodeABI(),
          // type: 1,
          // accessList: predictedAccessList
    });

		console.log("WAIT FOR TX RECEIPT: ")
		await tx
		console.log("TX RECEIPT: ")
		console.log(tx)

		await timeout(15*timeMilliSec)

		let balanceOfContract = await tokenErc20Deployed.methods.balanceOf(bugTestEC20Address).call()
    console.log("balanceOfContract: "+ balanceOfContract)

    // Useful for raw unsigned transactions.
    contracDeployedWithEthersProvider = new ethers.Contract(bugTestEC20Address, bugTestEC20ABI, signer);
    unsignedTx = await contracDeployedWithEthersProvider.populateTransaction.transferTest();
    console.log(unsignedTx)

    // chainIdCallRPC = await provider.send('eth_chainId')
    // console.log(chainIdCallRPC)

    predictedAccessList = await provider.send('eth_getAccessList', [unsignedTx])
    console.log(predictedAccessList)

		//Test contract after sending 1 token.
    txCount = await provider.getTransactionCount(signer.address);

    tx = signer.sendTransaction({
          chainId: chainIdConnected,
          to: bugTestEC20Address,
          nonce:    web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(300000), // Raise the gas limit to a much higher amount
          gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
          data: bugTestEC20Deployed.methods.transferTest().encodeABI(),
          type: 1,
          accessList: predictedAccessList
    });

    console.log("WAIT FOR TX RECEIPT: ")
    await tx
    console.log("TX RECEIPT: ")
    console.log(tx)

}

async function bugTestEC20TransferFrom() {

    const chainIdConnected = await web3.eth.getChainId();
    console.log("chainIdConnected: "+ chainIdConnected)

    const userBalance = await provider.getBalance(signer.address);
    console.log("User Balance [Shardeum SHM]" )
    console.log(ethers.utils.formatEther(userBalance))

    let blockNumber = await web3.eth.getBlockNumber();
    console.log("blockNumber: "+ blockNumber)

		let balanceOfSigner = await tokenErc20Deployed.methods.balanceOf(signer.address).call()
		console.log("balanceOfSigner: "+ balanceOfSigner)

		const allowance = await tokenErc20Deployed.methods.allowance(signer.address,bugTestEC20Address).call()
    console.log("allowance: "+ allowance)


		// // Useful for raw unsigned transactions.
    let contracDeployedWithEthersProvider = new ethers.Contract(tokenErc20Address, tokenErc20ABI, signer);
    let unsignedTx = await contracDeployedWithEthersProvider.populateTransaction.approve(bugTestEC20Address,"1000000000000000000");
    console.log(unsignedTx)

    // let chainIdCallRPC = await provider.send('eth_chainId')
    // console.log(chainIdCallRPC)

    let predictedAccessList = await provider.send('eth_getAccessList', [unsignedTx])
    console.log(predictedAccessList)

    let txCount = await provider.getTransactionCount(signer.address);

    let tx = signer.sendTransaction({
          chainId: chainIdConnected,
          to: tokenErc20Address,
          nonce:    web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(300000), // Raise the gas limit to a much higher amount
          gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
          data: tokenErc20Deployed.methods.approve(bugTestEC20Address,"1000000000000000000").encodeABI(),
          type: 1,
          accessList: predictedAccessList
    });

    console.log("WAIT FOR TX RECEIPT: ")
    await tx
		console.log(tx)
    console.log("TX RECEIPT: ")

		await timeout(15*timeMilliSec)

    // // Useful for raw unsigned transactions.
    contracDeployedWithEthersProvider = new ethers.Contract(bugTestEC20Address, bugTestEC20ABI, signer);
    unsignedTx = await contracDeployedWithEthersProvider.populateTransaction.transferFromTest();
    console.log(unsignedTx)

    // let chainIdCallRPC = await provider.send('eth_chainId')
    // console.log(chainIdCallRPC)

    predictedAccessList = await provider.send('eth_getAccessList', [unsignedTx])
    console.log(predictedAccessList)

    txCount = await provider.getTransactionCount(signer.address);

    tx = signer.sendTransaction({
          chainId: chainIdConnected,
          to: bugTestEC20Address,
          nonce:    web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(300000), // Raise the gas limit to a much higher amount
          gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
          data: bugTestEC20Deployed.methods.transferFromTest().encodeABI(),
          type: 1,
          accessList: predictedAccessList
    });

    console.log("WAIT FOR TX RECEIPT: ")
    await tx
    console.log("TX RECEIPT: ")
    console.log(tx)

}

async function bugTestEC20TransferBothTests() {

    const chainIdConnected = await web3.eth.getChainId();
    console.log("chainIdConnected: "+ chainIdConnected)

    const userBalance = await provider.getBalance(signer.address);
    console.log("User Balance [Shardeum SHM]" )
    console.log(ethers.utils.formatEther(userBalance))

    let blockNumber = await web3.eth.getBlockNumber();
    console.log("blockNumber: "+ blockNumber)

		let balanceOfSigner = await tokenErc20Deployed.methods.balanceOf(signer.address).call()
		console.log("balanceOfSigner: "+ balanceOfSigner)

		let balanceOfContract = await tokenErc20Deployed.methods.balanceOf(bugTestEC20Address).call()
		console.log("balanceOfContract: "+ balanceOfContract)

    const allowance = await tokenErc20Deployed.methods.allowance(signer.address,bugTestEC20Address).call()
    console.log("allowance: "+ allowance)


		// // Useful for raw unsigned transactions.
    let contracDeployedWithEthersProvider = new ethers.Contract(tokenErc20Address, tokenErc20ABI, signer);
    let unsignedTx = await contracDeployedWithEthersProvider.populateTransaction.approve(bugTestEC20Address,"1000000000000000000");
    console.log(unsignedTx)

    // let chainIdCallRPC = await provider.send('eth_chainId')
    // console.log(chainIdCallRPC)

    let predictedAccessList = await provider.send('eth_getAccessList', [unsignedTx])
    console.log(predictedAccessList)

    let txCount = await provider.getTransactionCount(signer.address);

    let tx = signer.sendTransaction({
          chainId: chainIdConnected,
          to: tokenErc20Address,
          nonce:    web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(300000), // Raise the gas limit to a much higher amount
          gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
          data: tokenErc20Deployed.methods.approve(bugTestEC20Address,"1000000000000000000").encodeABI(),
          type: 1,
          accessList: predictedAccessList
    });

    console.log("WAIT FOR TX RECEIPT: ")
    await tx
		console.log(tx)
    console.log("TX RECEIPT: ")

		await timeout(15*timeMilliSec)


    // // Useful for raw unsigned transactions.
    contracDeployedWithEthersProvider = new ethers.Contract(bugTestEC20Address, bugTestEC20ABI, signer);
    unsignedTx = await contracDeployedWithEthersProvider.populateTransaction.transferBothTests();
    console.log(unsignedTx)

    // let chainIdCallRPC = await provider.send('eth_chainId')
    // console.log(chainIdCallRPC)

    predictedAccessList = await provider.send('eth_getAccessList', [unsignedTx])
    console.log(predictedAccessList)

    txCount = await provider.getTransactionCount(signer.address);

    tx = signer.sendTransaction({
          chainId: chainIdConnected,
          to: bugTestEC20Address,
          nonce:    web3.utils.toHex(txCount),
          gasLimit: web3.utils.toHex(300000), // Raise the gas limit to a much higher amount
          gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
          data: bugTestEC20Deployed.methods.transferBothTests().encodeABI(),
          type: 1,
          accessList: predictedAccessList
    });

    console.log("WAIT FOR TX RECEIPT: ")
    await tx
    console.log("TX RECEIPT: ")
    console.log(tx)

}
