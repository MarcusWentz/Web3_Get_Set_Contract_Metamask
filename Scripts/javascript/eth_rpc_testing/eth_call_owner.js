const ethers = require("ethers");
(async () => {

  const provider = new ethers.providers.JsonRpcProvider("https://liberty20.shardeum.org")
  const contractAddress = "0x8f01876ccd727fd703787ed477b7f71e1e3adbb1";

  const rawCallData = "0x8da5cb5b";

  let callReturnData = provider.call({
    to: contractAddress,
    data: rawCallData
  });

  console.log(callReturnData);
  console.log(typeof(callReturnData));
  
})();
