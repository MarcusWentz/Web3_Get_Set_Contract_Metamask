const ethers = require("ethers");
(async () => {
  const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/");
  const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);
  const gasPrice = await provider.getGasPrice();
  console.log("gasPrice: " + gasPrice.toString() + " Wei");

  const gasLimit = await provider.estimateGas({
    to: signer.address,
    value: 1,
  });
  console.log("gasLimit: " + gasLimit.toString() + " Wei");

  const estimatedTransactionFee = gasPrice*gasLimit;
  console.log("estimatedTransactionFee = gasPrice*gasLimit = " + estimatedTransactionFee/(10**18) + " Ether"); // Rounded to 0.2415 Ether in Metamask.

})();
