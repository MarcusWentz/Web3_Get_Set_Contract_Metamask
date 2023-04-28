const ethers = require("ethers")
const fs = require('fs');
const Pool = require('@uniswap/v3-sdk').Pool;
const Token = require('@uniswap/sdk-core').Token;

const rpcURL = process.env.sepoliaInfuraHttps
const tokenERC20Address = '0x18e9437821bD2c69A5bCee1896eD18995E5a6A85'
const nonfungiblePositionManagerAddress = '0x65EB96E70Dc815dA41C672ED1D6Ab9737a0BA054'
const uniswapV3PoolWethBadAddress = '0xBdA7E38Be950Ade0BFbDb8594594935640d38aE3'

const provider = new ethers.providers.JsonRpcProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

const abiNonfungiblePositionManager = JSON.parse( fs.readFileSync('../abiNonfungiblePositionManager.json') );
const abiIERC20 = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]
const abiUniswapV3PoolWethBad = JSON.parse( fs.readFileSync('../abiUniswapV3Pool.json') );

const contractNonfungiblePositionManager = new ethers.Contract(nonfungiblePositionManagerAddress, abiNonfungiblePositionManager, signer);
const contractIERC20 = new ethers.Contract(tokenERC20Address, abiIERC20, signer);
const contractUniswapV3PoolWethBad = new ethers.Contract(uniswapV3PoolWethBadAddress, abiUniswapV3PoolWethBad , signer);

NonfungiblePositionManagerMint()

async function getWrappedTokenAddress() {  
  const storedData = await contractNonfungiblePositionManager.WETH9()
  return storedData
}

async function getFactoryAddress() {  
	const storedData = await contractNonfungiblePositionManager.factory()
	return storedData
}

async function getApprovalERC20() {  
	const storedData = await contractIERC20.allowance(signer.address,nonfungiblePositionManagerAddress)
	return storedData
}

async function NonfungiblePositionManagerMint() {

	const connectedNetworkObject = await provider.getNetwork();
	const chainIdConnected = connectedNetworkObject.chainId;
	console.log("chainIdConnected: "+ chainIdConnected)

	let wrappedTokenAddress = await getWrappedTokenAddress()
	console.log("wrappedTokenAddress: " + wrappedTokenAddress)

	let factoryAddress = await getFactoryAddress()
	console.log("factoryAddress: " + factoryAddress)

	let approvalERC20 = await getApprovalERC20()
	console.log("approvalERC20: " + approvalERC20)
	
	const poolData = await getPoolData(contractUniswapV3PoolWethBad)
	console.log("poolData: ")
	console.log(poolData)
	
  	const WethToken = new Token(31337, wrappedTokenAddress, 18, 'WETH', 'Wrapped Ether')
	const BadToken = new Token(31337, tokenERC20Address, 18, 'BAD', 'BulkAirDrop')
  		
	const pool = new Pool(
    	WethToken,
    	BadToken, 
    	poolData.fee,
    	poolData.sqrtPriceX96.toString(), // We set sqrtPriceX96=2^96 in UniswapV3Pool with function initialize(sqrtPriceX96) to have a 1/1 ratio https://www.youtube.com/watch?v=EV23xTgWsnY
    	poolData.liquidity.toString(),
    	poolData.tick
  	)

	// Helps with Shardeum Betanet 1.X nonce issue.
	const txCount = await provider.getTransactionCount(signer.address); 
	
	// const structParams = {
 //    	token0: wrappedTokenAddress,
 //    	token1: 0x18e9437821bD2c69A5bCee1896eD18995E5a6A85,
 //    	fee: poolData.fee, ???
 //    	tickLower: nearestUsableTick(poolData.tick, poolData.tickSpacing) - poolData.tickSpacing * 2, ???
 //    	tickUpper: nearestUsableTick(poolData.tick, poolData.tickSpacing) + poolData.tickSpacing * 2, ???
 //    	amount0Desired: amount0Desired.toString(), ???
 //    	amount1Desired: amount1Desired.toString(), ???
 //    	amount0Min: 0,
 //    	amount1Min: 0,
 //    	recipient: signer.address,
 //    	deadline: "115792089237316195423570985008687907853269984665640564039457584007913129639935"
 //  	}

	// const txSigned = await contractUniswapV2Router02.addLiquidityETH(
	// 	structParams,
	// 	{
	// 		value: 2000,
	// 		nonce: txCount
	// 	}
	// ); 

	// console.log(txSigned)

}

async function getPoolData(poolContract) {
  const [tickSpacing, fee, liquidity, slot0] = await Promise.all([
    poolContract.tickSpacing(),
    poolContract.fee(),
    poolContract.liquidity(),
    poolContract.slot0(),
  ])

  return {
    tickSpacing: tickSpacing,
    fee: fee,
    liquidity: liquidity.toString(),
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
  }
}