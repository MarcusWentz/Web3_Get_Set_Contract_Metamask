const ethers = require("ethers");
(async () => {
  // const provider = new ethers.providers.JsonRpcProvider(process.env.goerliHTTPS_InfuraAPIKey)
  const provider = new ethers.providers.JsonRpcProvider("https://liberty20.shardeum.org/")




  const txInfo = await provider.send("eth_getTransactionByHash", [
    "0x08a0e3064c4c195aad793235f23a6dc2959f66f2adbef0b1ba611df4d945069b",
  ]);
  console.log(txInfo);




})();

