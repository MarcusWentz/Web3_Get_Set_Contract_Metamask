const ethers = require("ethers");
(async () => {

  // Goerli
  // const provider = new ethers.providers.JsonRpcProvider(process.env.goerliHTTPS_InfuraAPIKey)

  // //Liberty 2.X
  const provider = new ethers.providers.JsonRpcProvider("http://45.79.181.218:8080/")
    


  const filter = {
    address: "0xc1202e7d42655F23097476f6D48006fE56d38d4f"
  };
  const filterId = await provider.send("eth_newFilter", [filter]);
  console.log(filterId);
  

})();
