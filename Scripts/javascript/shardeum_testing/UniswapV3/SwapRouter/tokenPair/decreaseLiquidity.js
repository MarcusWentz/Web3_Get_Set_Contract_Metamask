const { ethers } = require('ethers')
const { abi: INonfungiblePositionManagerABI } = require('@uniswap/v3-periphery/artifacts/contracts/interfaces/INonfungiblePositionManager.sol/INonfungiblePositionManager.json')

const rpcURL = process.env.sepoliaInfuraHttps // Your RPC URL goes here

const provider = new ethers.providers.JsonRpcProvider(rpcURL) // Ropsten
const positionManagerAddress = "0x49c389facbd26764946a3d61cdfe5db80f55a637" // NonfungiblePositionManager

main()

async function main() {

  const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);  
  
  const nonFungiblePositionManagerContract = new ethers.Contract(
    positionManagerAddress,
    INonfungiblePositionManagerABI,
    signer
  )

  const tokenIdLiquidityUniswapV3 = '2' //Minted tokenId transaction https://sepolia.etherscan.io/tx/0x7bfdbf24642989065d081831056f41cdaffb90c42b6810fc52c556718b0062be
  
  const positionData = await nonFungiblePositionManagerContract.positions(tokenIdLiquidityUniswapV3) //UniswapV3 Position tokenId
   
  const totalLiquidity = positionData.liquidity.toString()
  console.log("totalLiquidity: " + totalLiquidity)
  const halfLiquidity = parseInt(totalLiquidity / 2).toString()
  console.log("halfLiquidity: " + halfLiquidity)
    
  params = {
      tokenId: tokenIdLiquidityUniswapV3, // your tokenId
      liquidity: halfLiquidity,
      amount0Min: 0,
      amount1Min: 0,
      deadline: Math.floor(Date.now() / 1000) + (60 * 10),
  }
  
  const transaction = await nonFungiblePositionManagerContract.decreaseLiquidity(
    params,
    { 
      gasLimit: ethers.utils.hexlify(1000000)
    }
  )
  
  console.log(transaction)  
  
}
