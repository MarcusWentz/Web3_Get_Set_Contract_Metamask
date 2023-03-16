const ethers = require("ethers");

(async () => {

  const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/");

  // const provider = new ethers.providers.JsonRpcProvider(process.env.mainnetHTTPS_QuicknodeAPIKey);

  const uncleCount = await provider.send(
    "eth_getUncleCountByBlockNumber", 
    [
    "0xc5043f",
    ]
  );
  console.log(uncleCount);

})();