const ethers = require("ethers");

(async () => {

  const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/");
  const blockHash = "0xf2a9a9aa1e71d24f0f072f7ee3a2a46df1dd5b30ecdf44aa4742372470ebd1a4"; //Cycle 2000

  // const provider = new ethers.providers.JsonRpcProvider(process.env.mainnetHTTPS_QuicknodeAPIKey);
  // const blockHash = "0x829df9bb801fc0494abf2f443423a49ffa32964554db71b098d332d87b70a48b";
  
  const txCount = await provider.send("eth_getBlockTransactionCountByHash", [
    blockHash,
  ]);
  console.log(txCount);

})();