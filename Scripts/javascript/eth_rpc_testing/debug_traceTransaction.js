const ethers = require("ethers");

(async () => {

  // const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/");

  const provider = new ethers.providers.JsonRpcProvider(process.env.goerliQuicknodeHTTPS);
  // const provider = new ethers.providers.JsonRpcProvider(process.env.goerliHTTPS_InfuraAPIKey);
  // const provider = new ethers.providers.JsonRpcProvider(process.env.goerliAlchemyHTTPS);
  // const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/");

  const response = await provider.send("debug_traceTransaction", 
   [
    "0xeb8f728443e2e867d5abb181ada9d910412b3dd2067c155f67db7f641b043cc3" //Goerli
   ]
  );
  console.log(response);
  

})();