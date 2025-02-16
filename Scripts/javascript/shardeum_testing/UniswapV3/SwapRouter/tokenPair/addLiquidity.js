// Token addresses
DAI_ADDRESS= '0x7AF17A48a6336F7dc1beF9D485139f7B6f4FB5C8'
BAD_ADDRESS= '0x18e9437821bD2c69A5bCee1896eD18995E5a6A85'

// Uniswap contract address
WETH_ADDRESS= '0x68dfec648830d2f6eD320c2623473D7bac6A9B60'
FACTORY_ADDRESS= '0xc6225f47DFe6F26659f769eC7d665D9Eb9B832D8'
SWAP_ROUTER_ADDRESS= '0xd8B15a6C9D788D5c4D6d44bC7b9F4a9386c8d093'
NFT_DESCRIPTOR_ADDRESS= '0xe82cE139137F594F99Fc9dc3C592b96a2bED4EfB'
POSITION_DESCRIPTOR_ADDRESS= '0x0cD8A63A89E83B2A1A2D8d3166E37a7540DD8436'
POSITION_MANAGER_ADDRESS= '0x49C389FacBd26764946a3d61cdfe5dB80F55A637'

// Pool addresses
BAD_DAI_500= '0xfc4bc5160677513B7D306E5a5B81F9BcAA6fBd66'

const artifacts = {
  NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
  Bad: require("../WETH9.json"),
  Dai: require("../WETH9.json"),
  UniswapV3Pool: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json"),
};

const { Contract } = require("ethers")
const { Token } = require('@uniswap/sdk-core')
const { Pool, Position, nearestUsableTick } = require('@uniswap/v3-sdk')

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

async function main() {
  const [owner, signer2] = await ethers.getSigners();
  const provider = waffle.provider;

  const badContract = new Contract(BAD_ADDRESS,artifacts.Bad.abi,provider)
  const usdcContract = new Contract(DAI_ADDRESS,artifacts.Dai.abi,provider)

  await badContract.connect(owner).approve(POSITION_MANAGER_ADDRESS, ethers.utils.parseEther('1000'))
  await usdcContract.connect(owner).approve(POSITION_MANAGER_ADDRESS, ethers.utils.parseEther('1000'))

  const poolContract = new Contract(BAD_DAI_500, artifacts.UniswapV3Pool.abi, provider)

  const poolData = await getPoolData(poolContract)

  const BadToken = new Token(31337, BAD_ADDRESS, 18, 'BAD', 'BulkAirDrop')
  const DaiToken = new Token(31337, DAI_ADDRESS, 18, 'DAI', 'DAI Token')

  const pool = new Pool(
    BadToken,
    DaiToken,
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

  params = {
    token0: BAD_ADDRESS,
    token1: DAI_ADDRESS,
    fee: poolData.fee,
    tickLower: nearestUsableTick(poolData.tick, poolData.tickSpacing) - poolData.tickSpacing * 2,
    tickUpper: nearestUsableTick(poolData.tick, poolData.tickSpacing) + poolData.tickSpacing * 2,
    amount0Desired: amount0Desired.toString(),
    amount1Desired: amount1Desired.toString(),
    amount0Min: 0,
    amount1Min: 0,
    recipient: owner.address,
    deadline: Math.floor(Date.now() / 1000) + (60 * 10)
  }

  const nonfungiblePositionManager = new Contract(
    POSITION_MANAGER_ADDRESS,
    artifacts.NonfungiblePositionManager.abi,
    provider
  )

  const tx = await nonfungiblePositionManager.connect(owner).mint(
    params,
    { gasLimit: '1000000' }
  )
  const receipt = await tx.wait()
}

/*
npx hardhat run --network localhost scripts/04_addLiquidity.js
*/

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });