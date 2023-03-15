const ethers = require("ethers");

(async () => {

  // const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/");

  const provider = new ethers.providers.JsonRpcProvider(process.env.mainnetHTTPS_QuicknodeAPIKey);
  const uncleCount = await provider.send("eth_getUncleCountByBlockHash", 
   [
    "0xa917fcc721a5465a484e9be17cda0cc5493933dd3bc70c9adbee192cb419c9d7",
   ]
  );
  console.log(uncleCount);

})();