const ethers = require("ethers")
const fs = require('fs');

const rpcURL = "https://sphinx.shardeum.org/"// Your RPC URL goes here

const provider = new ethers.providers.JsonRpcProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

const addressUniswapV2Router02 = '0x7e4c1fB31355f208709822c30e660C61615A2a37'
const abiUniswapV2Router02 = JSON.parse( fs.readFileSync('abiUniswapV2Router02.json') );

const contractUniswapV2Router02 = new ethers.Contract(addressUniswapV2Router02, abiUniswapV2Router02, signer);

createAndSendTx()

async function getAddressWSHM() {  

  const storedData = await contractUniswapV2Router02.WETH()
  return storedData
}

async function createAndSendTx() {

	let wshmAddress = await getAddressWSHM()
	console.log(wshmAddress)

	//Helps with Shardeum Betanet 1.X nonce issue.
	const txCount = await provider.getTransactionCount(signer.address); 

	const txSigned = await contractUniswapV2Router02.addLiquidityETH(
		wshmAddress,
		2000,
		1000,
		1000,
		signer.address,
		"115792089237316195423570985008687907853269984665640564039457584007913129639935",
		{
			value: 1000,
			nonce: txCount
		}
	); 

	console.log(txSigned)

}
