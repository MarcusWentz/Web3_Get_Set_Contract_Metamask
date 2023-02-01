const ethers = require("ethers");
(async () => {

  // Goerli
  // const provider = new ethers.providers.JsonRpcProvider(process.env.goerliHTTPS_InfuraAPIKey)

  // //Liberty 2.X
  const provider = new ethers.providers.JsonRpcProvider("https://liberty20.shardeum.org/")
  
  const blockNum = await provider.getBlockNumber();
  console.log(blockNum);

  //https://www.quicknode.com/docs/ethereum/eth_getBlockByHash
  const blockDataByNumber = await provider.getBlock(611737);
  console.log(blockDataByNumber);

  const blockDataByHash = await provider.getBlock("0x402b13b86f813a1beb7dfc34a087a5426ac0030454aec352d9f7eb620f278743");
  console.log(blockDataByHash);


})();

// curl
// hash: 0x402b13b86f813a1beb7dfc34a087a5426ac0030454aec352d9f7eb620f278743
// bundle: 611737

// curl https://liberty20.shardeum.org/ \
  // -X POST \
  // -H "Content-Type: application/json" \
  // --data '{"method":"eth_getBlockByHash","params":["0x402b13b86f813a1beb7dfc34a087a5426ac0030454aec352d9f7eb620f278743",false],"id":1,"jsonrpc":"2.0"}'

// Block number keeps increasing with the same block number hash. 