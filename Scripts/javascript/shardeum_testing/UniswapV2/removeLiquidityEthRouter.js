const ethers = require("ethers")
const fs = require('fs');

// const rpcURL = "https://sphinx.shardeum.org/"// Your RPC URL goes here
// const addressUniswapV2Router02 = '0x61716e3E7b5A6f11bB985f76E4195Fc55d7FCE9c'

const rpcURL = process.env.sepoliaInfuraHttps
const tokenERC20Address = "0x18e9437821bD2c69A5bCee1896eD18995E5a6A85"
const addressUniswapV2Router02 = '0xd49d79d476215BEF1E5AC43c46eC9dB6E7906dbD'

const provider = new ethers.providers.JsonRpcProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

const abiUniswapV2Router02 = JSON.parse( fs.readFileSync('abiUniswapV2Router02.json') );

const contractUniswapV2Router02 = new ethers.Contract(addressUniswapV2Router02, abiUniswapV2Router02, signer);

UniswapV2RouterRemoveLiquidityETH()

async function getWrappedTokenAddress() {  

  const storedData = await contractUniswapV2Router02.WETH()
  return storedData
}

async function getFactoryAddress() {  

	const storedData = await contractUniswapV2Router02.factory()
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

	//FOR REMOVING LIQUIDITY, MAKE SURE YOU PROVIDE APPROVAL FOR TOKEN A FOR ROUTER TO transferFrom
	//FOR REMOVING LIQUIDITY, MAKE SURE YOU PROVIDE APPROVAL FOR TOKEN A FOR ROUTER TO transferFrom

	// Helps with Shardeum Betanet 1.X nonce issue.
	const txCount = await provider.getTransactionCount(signer.address); 

	const txSigned = await contractUniswapV2Router02.removeLiquidityETH(
		tokenERC20Address,
		2000,
		2000,
		2000,
		signer.address,
		"115792089237316195423570985008687907853269984665640564039457584007913129639935",
		{
			from: signer.address,
			nonce: txCount
		}
	); 

	console.log(txSigned)

}