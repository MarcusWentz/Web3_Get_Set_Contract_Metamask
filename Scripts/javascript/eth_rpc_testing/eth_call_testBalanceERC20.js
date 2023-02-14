const ethers = require("ethers");
(async () => {

  // Goerli
  const provider = new ethers.providers.JsonRpcProvider(process.env.goerliHTTPS_InfuraAPIKey)
  const chainLinkTokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";

  //Betanet 1.X
  // const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/")
  // const chainLinkTokenAddress = "0xdbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37";

  const fromWallet = "0x66C1d8A5ee726b545576A75380391835F8AAA43c";
  const sliceWalletToAddToData = fromWallet.slice(2,42);

  const hexStringFunction = ethers.utils.toUtf8Bytes("balanceOf(address)")
  const hexStringFunctionHashed = ethers.utils.keccak256(hexStringFunction)
  const functionSelector = hexStringFunctionHashed.slice(0,10);

  let callData = functionSelector + "000000000000000000000000" + sliceWalletToAddToData

  console.log(callData)

  let callReturnData = await provider.call({
    from: fromWallet, 
    to: chainLinkTokenAddress,
    data: callData
  });

  let decimalLinkBalance = BigInt(callReturnData).toString()

  console.log("balanceOf(" + fromWallet + "):");
  console.log(decimalLinkBalance/(10**18) + " LINK");
  
})();
