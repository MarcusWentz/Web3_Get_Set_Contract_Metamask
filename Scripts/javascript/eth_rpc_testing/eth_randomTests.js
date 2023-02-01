const ethers = require("ethers");
(async () => {

  // Goerli
  const provider = new ethers.providers.JsonRpcProvider(process.env.goerliHTTPS_InfuraAPIKey)

  // //Liberty 2.X
  // const provider = new ethers.providers.JsonRpcProvider("https://liberty20.shardeum.org/")
  
  
  //TEST GOES HERE
  const txReceipt = await provider.waitForTransaction( 
    "0x8229ac8d9ecfa6ea4d9c5696a8ab2c463455ca0e9f99f0d351615b42784700eb"
  );
  console.log(txReceipt);


})();
