const ethers = require("ethers");

(async () => {

  // const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/");
  // const blockNumber = "0x8192"

  const provider = new ethers.providers.JsonRpcProvider(process.env.mainnetHTTPS_QuicknodeAPIKey);
  const blockNumber = "0xc5043f"
  
  const blockData = await provider.getBlock(
    blockNumber,
    false
  );
  console.log(blockData);

})();