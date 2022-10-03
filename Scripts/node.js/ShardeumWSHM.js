const Web3 = require('web3')
const ethers = require("ethers")

const rpcURL = "https://liberty20.shardeum.org/"
const web3 = new Web3(rpcURL)

const provider = new ethers.providers.JsonRpcProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);
console.log("User wallet address: " + signer.address)

const contractAddress_JS = '0x37160d3cB5834B090621AB2A86355493d808f45B'
const contractABI_JS = [{"inputs":[],"name":"multicallDeposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"multicallWithdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WSHM","outputs":[{"internalType":"contractinterfaceWSHM","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

const contractDefined_JS = new web3.eth.Contract(contractABI_JS, contractAddress_JS)

const timeMilliSec = 1000;

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}

createAndSendTx();

async function createAndSendTx() {

    const chainIdConnected = await web3.eth.getChainId();
    console.log("chainIdConnected: "+ chainIdConnected)

    const addressWSHM = await contractDefined_JS.methods.WSHM().call()
		const abiWSHM = [{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]
		const deployedWSHM = new web3.eth.Contract(abiWSHM, addressWSHM)

		console.log("addressWSHM: "+ addressWSHM)

		const signerBalanceWSHM = await deployedWSHM.methods.balanceOf(signer.address).call()
		console.log("signerBalanceWSHM: "+ signerBalanceWSHM)

		const allowanceSignerMulticall = await deployedWSHM.methods.allowance(signer.address,contractAddress_JS).call()
		console.log("allowanceSignerMulticall: "+ allowanceSignerMulticall)

    const codeHash = await provider.getCode(addressWSHM)
    console.log("addressWSHM codeHash: " + codeHash)

		const oneEtherInWeiSHM = "1000000000000000000"
		const twoEtherInWeiSHM = "2000000000000000000"

    let txCount = await provider.getTransactionCount(signer.address);

    const depositTwoEtherSHM = signer.sendTransaction({
        chainId: chainIdConnected,
        to: contractAddress_JS,
        nonce:    web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(2100000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
        data: contractDefined_JS.methods.multicallDeposit().encodeABI(),
        type: 1,
        value: twoEtherInWeiSHM,
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
    await depositTwoEtherSHM
    console.log("TX RECEIPT: ")
    console.log(depositTwoEtherSHM)
		console.log("WAIT 30 SECONDS, THEN TRY TO APPROVE WSHM BEFORE WITHDRAW! ")
		await timeout(30*timeMilliSec)

		// MAKE SURE YOU APPROVE WSHM BEFORE YOU TRY TO WITHDRAW TO CALL "transferFrom()"!
		txCount = await provider.getTransactionCount(signer.address);

    const approveOneEtherWSHM = signer.sendTransaction({
        chainId: chainIdConnected,
        to: addressWSHM,
        nonce:    web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(2100000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
        data: deployedWSHM.methods.approve(contractAddress_JS,oneEtherInWeiSHM).encodeABI(),
        // type: 1,
        // accessList: [
        //   {
        //     address: addressWSHM, //Contract address we are calling from the "to" contract at some point.
        //     storageKeys: [
        //       // "0x0000000000000000000000000000000000000000000000000000000000000000",
        //       codeHash, //Code hash from EXTCODEHASH https://blog.finxter.com/how-to-find-out-if-an-ethereum-address-is-a-contract/
        //     ]
        //   }
        // ]

    });

    console.log("WAIT FOR TX RECEIPT: ")
    await approveOneEtherWSHM
    console.log("TX RECEIPT: ")
    console.log(approveOneEtherWSHM)

		console.log("WAIT 30 SECONDS, THEN TRY TO WITHDRAW! ")
		await timeout(30*timeMilliSec)

    txCount = await provider.getTransactionCount(signer.address);

    const withdrawOneEtherSHM = signer.sendTransaction({
        chainId: chainIdConnected,
        to: contractAddress_JS,
        nonce:    web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(2100000), // Raise the gas limit to a much higher amount
        gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
        data: contractDefined_JS.methods.multicallWithdraw(oneEtherInWeiSHM).encodeABI(),
        type: 1,
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
    await withdrawOneEtherSHM
    console.log("TX RECEIPT: ")
    console.log(withdrawOneEtherSHM)

}
