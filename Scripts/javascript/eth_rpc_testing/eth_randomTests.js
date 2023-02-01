const ethers = require("ethers");
(async () => {
  const provider = new ethers.providers.JsonRpcProvider("https://liberty20.shardeum.org/")
  const contents = await provider.getStorageAt(
    "0xdE8A6Ba520f20eA9890B10e9Fb99b952Ec11fCd5", 
    0
  )
  console.log(contents)
})();

