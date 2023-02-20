const ethers = require("ethers");
(async () => {

  // Goerli
  // const provider = new ethers.providers.JsonRpcProvider(process.env.goerliHTTPS_InfuraAPIKey)
  // const contractAddress = '0xA813e6fA2AB7Ea78c3F175F2d2333684074FAe1C';

  // Betanet 1.X
  const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/")
  const contractAddress = '0xB426ccDBA7E602F7A0EF81a6A8Ee34841b540595';

  const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKeyTwo, 'hex'), provider);

  let contractABI = [{"inputs":[{"internalType":"string","name":"message","type":"string"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"verifyString","outputs":[{"internalType":"address","name":"signer","type":"address"}],"stateMutability":"pure","type":"function"}]

  let contract = new ethers.Contract(contractAddress, contractABI, signer);;

  let message = "test";

  let flatSig = await signer.signMessage(message);

  let sig = ethers.utils.splitSignature(flatSig);

  let recovered = await contract.verifyString(message, sig.v, sig.r, sig.s);

  console.log("Recovered wallet: " + recovered);  

})();
