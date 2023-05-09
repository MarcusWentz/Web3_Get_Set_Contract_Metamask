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
     
  params = {      
      tokenId: tokenIdLiquidityUniswapV3,
      recipient: signer.address,
      amount0Max: "340282366920938463463374607431768211455", //type(uint128).max
      amount1Max: "340282366920938463463374607431768211455" //type(uint128).max
  }
  
  const transaction = await nonFungiblePositionManagerContract.collect(
    params,
    { 
      gasLimit: ethers.utils.hexlify(1000000)
    }
  )
  
  console.log(transaction)  
  
}
