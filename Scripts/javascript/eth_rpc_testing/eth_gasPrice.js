const ethers = require("ethers");
(async () => {
  const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/");
  const gasPrice = await provider.getGasPrice();
  console.log(gasPrice);
})();
