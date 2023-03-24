const ethers = require("ethers");

(async () => {

  const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/");

  // const provider = new ethers.providers.JsonRpcProvider(process.env.mainnetHTTPS_QuicknodeAPIKey);
  
  const uncleParameters = await provider.send("eth_getUncleByBlockNumberAndIndex", 
   [
    "0xc5043f",
    "0x0"
    // "0X1"
   ]
  );
  console.log(uncleParameters);

})();