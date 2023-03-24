const ethers = require("ethers");

(async () => {

  const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/");

  // const provider = new ethers.providers.JsonRpcProvider(process.env.mainnetHTTPS_QuicknodeAPIKey);
  
  const uncleParameters = await provider.send("eth_getUncleByBlockHashAndIndex", 
   [
    "0xa917fcc721a5465a484e9be17cda0cc5493933dd3bc70c9adbee192cb419c9d7",
    "0x0"
    // "0x1"
   ]
  );
  console.log(uncleParameters);

})();