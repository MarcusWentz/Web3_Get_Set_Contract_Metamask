const ethers = require("ethers")
const fs = require('fs');

// const rpcURL = "https://sphinx.shardeum.org/"// Your RPC URL goes here
// const addressUniswapV2Router02 = '0x61716e3E7b5A6f11bB985f76E4195Fc55d7FCE9c'

// const rpcURL = process.env.sepoliaInfuraHttps
// const UniswapV2LiquidityPairTokenAddress = "0x78d74109d9543f1900cb3842da3986F5fe14C2DA" //WETH and another ERC-20 token.
// const tokenERC20Address = "0x18e9437821bD2c69A5bCee1896eD18995E5a6A85"
// const addressUniswapV2Router02 = '0xd49d79d476215BEF1E5AC43c46eC9dB6E7906dbD'

const rpcURL = process.env.baseSepoliaHTTPS
const UniswapV2LiquidityPairTokenAddress = "0xC9ae620655690E6334C412a74ecf30DF85FD8458" //WETH and another ERC-20 token.
const tokenERC20Address = "0xE4aB69C077896252FAFBD49EFD26B5D171A32410"
const addressUniswapV2Router02 = '0x794c842Ef3EE218464068F0FFC4Bc084453CDeDD'

const provider = new ethers.providers.JsonRpcProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

const abiUniswapV2Router02 = JSON.parse( fs.readFileSync('../abiUniswapV2Router02.json') );
const abiIERC20 = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

const contractUniswapV2Router02 = new ethers.Contract(addressUniswapV2Router02, abiUniswapV2Router02, signer);
const contractIERC20 = new ethers.Contract(UniswapV2LiquidityPairTokenAddress, abiIERC20, signer);

UniswapV2RouterRemoveLiquidityETH()

async function getWrappedTokenAddress() {  
	const storedData = await contractUniswapV2Router02.WETH()
	return storedData
}

async function getFactoryAddress() {  
	const storedData = await contractUniswapV2Router02.factory()
	return storedData
}

async function getApprovalERC20() {  
	const storedData = await contractIERC20.allowance(signer.address,addressUniswapV2Router02)
	return storedData
}

async function UniswapV2RouterRemoveLiquidityETH() {

	const connectedNetworkObject = await provider.getNetwork();
	const chainIdConnected = connectedNetworkObject.chainId;
	console.log("chainIdConnected: "+ chainIdConnected)

	let wrappedTokenAddress = await getWrappedTokenAddress()
	console.log("wrappedTokenAddress: " + wrappedTokenAddress)

	let factoryAddress = await getFactoryAddress()
	console.log("factoryAddress: " + factoryAddress)

	let approvalERC20 = await getApprovalERC20()
	console.log("approvalERC20: " + approvalERC20)

	// const txApproveMoreUniswapV2LiquidityTokens = await contractIERC20.approve(
	// 	addressUniswapV2Router02,
	// 	7000
	// ); 

	// console.log(txApproveMoreUniswapV2LiquidityTokens)
	
	// Helps with Shardeum Betanet 1.X nonce issue.
	const txCount = await provider.getTransactionCount(signer.address); 

	const txSigned = await contractUniswapV2Router02.removeLiquidityETH(
		tokenERC20Address,
		1000, // 2000,
		500,  // 1000,
		600,  // 1000,
		signer.address,
		"115792089237316195423570985008687907853269984665640564039457584007913129639935",
		{
			from: signer.address,
			nonce: txCount
		}
	); 

	console.log(txSigned)

}