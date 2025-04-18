const { ethers } = require('ethers')
const { abi: IUniswapV3PoolABI } = require('@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json')
const { abi: SwapRouterABI} = require('@uniswap/v3-periphery/artifacts/contracts/interfaces/ISwapRouter.sol/ISwapRouter.json')
const ERC20ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

// const rpcURL = process.env.sepoliaInfuraHttps // Your RPC URL goes here

const rpcURL = process.env.baseSepoliaHTTPS // Your RPC URL goes here

const provider = new ethers.providers.JsonRpcProvider(rpcURL)

// const poolAddress = "0xfc4bc5160677513B7D306E5a5B81F9BcAA6fBd66" // UNI/WETH
// const swapRouterAddress = '0xd8B15a6C9D788D5c4D6d44bC7b9F4a9386c8d093'

// const name0 = 'BulkAirDrop'
// const symbol0 = 'BAD'
// const decimals0 = 18
// const address0 = '0x18e9437821bD2c69A5bCee1896eD18995E5a6A85'

// const name1 = 'DAI Token'
// const symbol1 = 'DAI'
// const decimals1 = 18
// const address1 = '0x7AF17A48a6336F7dc1beF9D485139f7B6f4FB5C8'

// const name1 = 'BulkAirDrop'
// const symbol1 = 'BAD'
// const decimals1 = 18
// const address1 = '0x18e9437821bD2c69A5bCee1896eD18995E5a6A85'

// const name0 = 'DAI Token'
// const symbol0 = 'DAI'
// const decimals0 = 18
// const address0 = '0x7AF17A48a6336F7dc1beF9D485139f7B6f4FB5C8'

const poolAddress = "0x65fd564ab5fe8bc10695107a0096ab8ec7916dc2" 
const swapRouterAddress = '0xE0F5DFdE6CC9770E2e45d91832CaE8D4FeE20526'

const name1 = 'Wrapped Ether'
const symbol1 = 'WETH'
const decimals1 = 18
const address1 = '0x4200000000000000000000000000000000000006'

const name0 = 'Chainlink'
const symbol0 = 'LINK'
const decimals0 = 18
const address0 = '0xE4aB69C077896252FAFBD49EFD26B5D171A32410'

const getPoolImmutables = async (poolContract) => {
  const [token0, token1, fee] = await Promise.all([
    poolContract.token0(),
    poolContract.token1(),
    poolContract.fee()
  ])

  const immutables = {
    token0: token0,
    token1: token1,
    fee: fee
  }
  return immutables
}

const getPoolState = async (poolContract) => {
  const slot = poolContract.slot0()

  const state = {
    sqrtPriceX96: slot[0]
  }

  return state
}

main()

async function main() {
  const poolContract = new ethers.Contract(
    poolAddress,
    IUniswapV3PoolABI,
    provider
  )

  const immutables = await getPoolImmutables(poolContract)
  const state = await getPoolState(poolContract)

  const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

  const swapRouterContract = new ethers.Contract(
    swapRouterAddress,
    SwapRouterABI,
    signer
  )

  // const inputAmount = 0.001
  // const amountIn = ethers.utils.parseUnits(
  //   inputAmount.toString(),
  //   decimals0
  // )
  const amountIn = 100

  // const approvalAmount = (amountIn*1000).toString()
  // const tokenContract0 = new ethers.Contract(
  //   address0,
  //   ERC20ABI,
  //   signer
  // )
  // const approvalResponse = await tokenContract0.approve(
  //   swapRouterAddress,
  //   approvalAmount
  // )

  const params = {
    tokenIn: immutables.token1,
    tokenOut: immutables.token0,
    fee: immutables.fee,
    recipient: signer.address,
    deadline: Math.floor(Date.now() / 1000) + (60 * 10),
    amountIn: amountIn,
    amountOutMinimum: 0,
    sqrtPriceLimitX96: 0,
  }

  console.log(params)

  // Tenderly:
  // UniswapV3SwapRouter.computeAddress(
  //   factory = 0x6e553ceedadefcd0fce6a220bc17814db8a193d0,
  //   key = {
  //     "token0":"0x4200000000000000000000000000000000000006",
  //     "token1":"0xe4ab69c077896252fafbd49efd26b5d171a32410",
  //     "fee":"500"}) => (
  //   0xb8835e8c3769d00e90056db4957a399a342dfa5c
  //   )
  // computeAddress seems incorrect? Does SwapRouter depends on ???
  // Maybe update POOL_INIT_CODE_HASH right after UniswapV3Factory is deployed.

  const tx = await swapRouterContract.exactInputSingle(
    params
    // params,
    // {
    //   // gasLimit: ethers.utils.hexlify(1000000)
    //   gasLimit: '100000'
    // }
  )
  
  console.log(tx)
}
