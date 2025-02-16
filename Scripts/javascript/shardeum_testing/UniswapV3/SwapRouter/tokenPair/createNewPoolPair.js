const ethers = require("ethers") // npm i ethers@5.7.2 https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/5139#discussioncomment-5444517
const { abi: INonfungiblePositionManagerABI } = require('@uniswap/v3-periphery/artifacts/contracts/interfaces/INonfungiblePositionManager.sol/INonfungiblePositionManager.json')

const rpcURL = process.env.sepoliaInfuraHttps // Your RPC URL goes here

const provider = new ethers.providers.JsonRpcProvider(rpcURL) // Ropsten
const positionManagerAddress = "0x49c389facbd26764946a3d61cdfe5db80f55a637" // NonfungiblePositionManager

function encodePriceSqrt(reserve0, reserve1) {
  return BigInt(Math.sqrt(reserve1 / reserve0) * Math.pow(2, 96));
}

main()

async function main() {

  const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);  
  
  const nonFungiblePositionManagerContract = new ethers.Contract(
    positionManagerAddress,
    INonfungiblePositionManagerABI,
    signer
  )

  const wethAddres = 0x18e9437821bD2c69A5bCee1896eD18995E5a6A85;
  const linkAddress = 0x779877A7B0D9E8603169DdbD7836e478b4624789;

  const expectedOutput = BigInt(79228162514264337593543950336);
  const sqrtEncodeTest = encodePriceSqrt(1, 1);

  console.log("encodePriceSqrt(1, 1) = " + sqrtEncodeTest);
  if(expectedOutput != encodePriceSqrt(1, 1)){
    console.log("encodePriceSqrt(1, 1) value should be " + expectedOutput + " but is " + encodePriceSqrt(1, 1))
    return;
  }

  params = {
    token0:	wethAddres,
    token1:	linkAddress,
    fee:	500,
    sqrtPriceX96:	79228162514264337593543950336,
  }
  
  // const transaction = await nonFungiblePositionManagerContract.createAndInitializePoolIfNecessary(
  //   params
  // )
  
  // console.log(transaction)  
  
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

// const artifacts = {
//   UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
//   NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
// };

// const { Contract, BigNumber } = require("ethers")
// const bn = require('bignumber.js')
// bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 })

// const provider = waffle.provider;

// function encodePriceSqrt(reserve1, reserve0) {
//   return BigNumber.from(
//     new bn(reserve1.toString())
//       .div(reserve0.toString())
//       .sqrt()
//       .multipliedBy(new bn(2).pow(96))
//       .integerValue(3)
//       .toString()
//   )
// }

// const nonfungiblePositionManager = new Contract(
//   POSITION_MANAGER_ADDRESS,
//   artifacts.NonfungiblePositionManager.abi,
//   provider
// )
// const factory = new Contract(
//   FACTORY_ADDRESS,
//   artifacts.UniswapV3Factory.abi,
//   provider
// )

// async function deployPool(token0, token1, fee, price) {
//   const [owner] = await ethers.getSigners();
//   await nonfungiblePositionManager.connect(owner).createAndInitializePoolIfNecessary(
//     token0,
//     token1,
//     fee,
//     price,
//     { gasLimit: 5000000 }
//   )
//   const poolAddress = await factory.connect(owner).getPool(
//     token0,
//     token1,
//     fee,
//   )
//   return poolAddress
// }


// async function main() {
//   const badLink500 = await deployPool(BAD_ADDRESS, DAI_ADDRESS, 500, encodePriceSqrt(1, 1))
//   console.log('BAD_DAI_500=', `'${badLink500}'`)
// }

// /*
// npx hardhat run --network localhost scripts/03_deployPools.js
// */

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });