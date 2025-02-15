const ethers = require("ethers") // npm i ethers@5.7.2 https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/5139#discussioncomment-5444517
const { abi: INonfungiblePositionManagerABI } = require('@uniswap/v3-periphery/artifacts/contracts/interfaces/INonfungiblePositionManager.sol/INonfungiblePositionManager.json')
const { abi: UniswapV3PoolABI } = require('@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json')
const { Pool, Position, nearestUsableTick } = require('@uniswap/v3-sdk')
const { Token } = require('@uniswap/sdk-core')

// const rpcURL = process.env.sepoliaInfuraHttps // Your RPC URL goes here

const rpcURL = process.env.baseSepoliaHTTPS // Your RPC URL goes here

const provider = new ethers.providers.JsonRpcProvider(rpcURL) // Ropsten

// const positionManagerAddress = "0x49c389facbd26764946a3d61cdfe5db80f55a637" // NonfungiblePositionManager

const positionManagerAddress = "0x25F94FD6B15504A556BEF182A646Ec2344DFaCFF" // NonfungiblePositionManager

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
    liquidity: liquidity,
    sqrtPriceX96: slot0[0],
    tick: slot0[1],
  }
}

main()

async function main() {

  const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);  
  
  const nonFungiblePositionManagerContract = new ethers.Contract(
    positionManagerAddress,
    INonfungiblePositionManagerABI,
    signer
  )

  // const wethAddres = "0x18e9437821bD2c69A5bCee1896eD18995E5a6A85";
  // const linkAddress = "0x779877A7B0D9E8603169DdbD7836e478b4624789";

  const wethAddres = "0x4200000000000000000000000000000000000006";
  const linkAddress = "0xE4aB69C077896252FAFBD49EFD26B5D171A32410";

  // const token0 =	wethAddres;
  // const token1 =	linkAddress;
  // const fee =	500;
  // const tickLower =	-20;
  // const tickUpper	=	20;
  // const amount0Desired	=	999450219928521;
  // const amount1Desired =	999450219928521;
  // const amount0Min =	0;
  // const amount1Min =	0;
  // const recipient =	signer.address;
  // const deadline = BigInt(115792089237316195423570985008687907853269984665640564039457584007913129639935);
  

  // Pool addresses
  LINK_WETH_500= "0xe2774d552037652682cbac82f7d7a1f58fae8da2"

  const poolContract = new ethers.Contract(
    LINK_WETH_500, 
    UniswapV3PoolABI, 
    signer
  )

  const poolData = await getPoolData(poolContract)

  // console.log(poolData)

  const WethToken = new Token(31337, wethAddres, 18, 'WETH', 'Wrapped Ether')
  const LinkToken = new Token(31337, linkAddress, 18, 'LINK', 'Chainlink')

  const pool = new Pool(
    WethToken,
    LinkToken,
    poolData.fee,
    poolData.sqrtPriceX96.toString(),
    poolData.liquidity.toString(),
    poolData.tick
  )

  const position = new Position({
    pool: pool,
    liquidity: ethers.utils.parseEther('1'),
    tickLower: nearestUsableTick(poolData.tick, poolData.tickSpacing) - poolData.tickSpacing * 2,
    tickUpper: nearestUsableTick(poolData.tick, poolData.tickSpacing) + poolData.tickSpacing * 2,
  })


  const { amount0: amount0Desired, amount1: amount1Desired} = position.mintAmounts

  // Uniswap V3 minting sqrtPriceX96 with pool.slot0()
  // https://docs.uniswap.org/sdk/v3/guides/liquidity/minting
  // Revert with 
  // (uint160 sqrtPriceX96, , , , , , ) = pool.slot0();
  // https://github.com/Uniswap/v3-periphery/blob/main/contracts/base/LiquidityManagement.sol#L67

  params = {
    token0: wethAddres,
    token1: linkAddress,
    fee: poolData.fee,
    tickLower: nearestUsableTick(poolData.tick, poolData.tickSpacing) - poolData.tickSpacing * 2,
    tickUpper: nearestUsableTick(poolData.tick, poolData.tickSpacing) + poolData.tickSpacing * 2,
    amount0Desired: amount0Desired.toString(),
    amount1Desired: amount1Desired.toString(),
    amount0Min: 0,
    amount1Min: 0,
    recipient: signer.address,
    deadline: BigInt(Math.floor(Date.now() / 1000) + (60 * 10))
  }

  console.log(params)

  // const tx = await nonFungiblePositionManagerContract.mint(
  //   params
  //   // { gasLimit: '1000000' }
  // )
  
  // console.log(tx)  
  
}


// // Token addresses
// DAI_ADDRESS= '0x7AF17A48a6336F7dc1beF9D485139f7B6f4FB5C8'
// BAD_ADDRESS= '0x18e9437821bD2c69A5bCee1896eD18995E5a6A85'

// // Uniswap contract address
// WETH_ADDRESS= '0x68dfec648830d2f6eD320c2623473D7bac6A9B60'
// FACTORY_ADDRESS= '0xc6225f47DFe6F26659f769eC7d665D9Eb9B832D8'
// SWAP_ROUTER_ADDRESS= '0xd8B15a6C9D788D5c4D6d44bC7b9F4a9386c8d093'
// NFT_DESCRIPTOR_ADDRESS= '0xe82cE139137F594F99Fc9dc3C592b96a2bED4EfB'
// POSITION_DESCRIPTOR_ADDRESS= '0x0cD8A63A89E83B2A1A2D8d3166E37a7540DD8436'
// POSITION_MANAGER_ADDRESS= '0x49C389FacBd26764946a3d61cdfe5dB80F55A637'

// // Pool addresses
// BAD_DAI_500= '0xfc4bc5160677513B7D306E5a5B81F9BcAA6fBd66'

// const artifacts = {
//   NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
//   Bad: require("../WETH9.json"),
//   Dai: require("../WETH9.json"),
//   UniswapV3Pool: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json"),
// };

// const { Contract } = require("ethers")
// const { Token } = require('@uniswap/sdk-core')
// const { Pool, Position, nearestUsableTick } = require('@uniswap/v3-sdk')

// async function getPoolData(poolContract) {
//   const [tickSpacing, fee, liquidity, slot0] = await Promise.all([
//     poolContract.tickSpacing(),
//     poolContract.fee(),
//     poolContract.liquidity(),
//     poolContract.slot0(),
//   ])

//   return {
//     tickSpacing: tickSpacing,
//     fee: fee,
//     liquidity: liquidity,
//     sqrtPriceX96: slot0[0],
//     tick: slot0[1],
//   }
// }

// async function main() {
//   const [owner, signer2] = await ethers.getSigners();
//   const provider = waffle.provider;

//   const badContract = new Contract(BAD_ADDRESS,artifacts.Bad.abi,provider)
//   const usdcContract = new Contract(DAI_ADDRESS,artifacts.Dai.abi,provider)

//   await badContract.connect(owner).approve(POSITION_MANAGER_ADDRESS, ethers.utils.parseEther('1000'))
//   await usdcContract.connect(owner).approve(POSITION_MANAGER_ADDRESS, ethers.utils.parseEther('1000'))

//   const poolContract = new Contract(BAD_DAI_500, artifacts.UniswapV3Pool.abi, provider)

//   const poolData = await getPoolData(poolContract)

//   const BadToken = new Token(31337, BAD_ADDRESS, 18, 'BAD', 'BulkAirDrop')
//   const DaiToken = new Token(31337, DAI_ADDRESS, 18, 'DAI', 'DAI Token')

//   const pool = new Pool(
//     BadToken,
//     DaiToken,
//     poolData.fee,
//     poolData.sqrtPriceX96.toString(),
//     poolData.liquidity.toString(),
//     poolData.tick
//   )

//   const position = new Position({
//     pool: pool,
//     liquidity: ethers.utils.parseEther('1'),
//     tickLower: nearestUsableTick(poolData.tick, poolData.tickSpacing) - poolData.tickSpacing * 2,
//     tickUpper: nearestUsableTick(poolData.tick, poolData.tickSpacing) + poolData.tickSpacing * 2,
//   })

//   const { amount0: amount0Desired, amount1: amount1Desired} = position.mintAmounts

//   params = {
//     token0: BAD_ADDRESS,
//     token1: DAI_ADDRESS,
//     fee: poolData.fee,
//     tickLower: nearestUsableTick(poolData.tick, poolData.tickSpacing) - poolData.tickSpacing * 2,
//     tickUpper: nearestUsableTick(poolData.tick, poolData.tickSpacing) + poolData.tickSpacing * 2,
//     amount0Desired: amount0Desired.toString(),
//     amount1Desired: amount1Desired.toString(),
//     amount0Min: 0,
//     amount1Min: 0,
//     recipient: owner.address,
//     deadline: Math.floor(Date.now() / 1000) + (60 * 10)
//   }

//   const nonfungiblePositionManager = new Contract(
//     POSITION_MANAGER_ADDRESS,
//     artifacts.NonfungiblePositionManager.abi,
//     provider
//   )

//   const tx = await nonfungiblePositionManager.connect(owner).mint(
//     params,
//     { gasLimit: '1000000' }
//   )
//   const receipt = await tx.wait()
// }

// /*
// npx hardhat run --network localhost scripts/04_addLiquidity.js
// */

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });