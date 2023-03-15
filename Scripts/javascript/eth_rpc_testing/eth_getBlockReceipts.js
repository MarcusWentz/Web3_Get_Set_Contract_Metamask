const ethers = require("ethers");

(async () => {

//   const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/");
//   const params = "0x8192";

  const provider = new ethers.providers.JsonRpcProvider(process.env.mainnetHTTPS_QuicknodeAPIKey);
  const params = "0xEDA8CE";

  const result = await provider.send("eth_getBlockReceipts", [params]);
  console.log(result);

})();