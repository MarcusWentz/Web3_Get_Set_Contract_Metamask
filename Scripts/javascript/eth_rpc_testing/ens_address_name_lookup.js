const ethers = require("ethers")

const rpcURL = process.env.goerliHTTPS_InfuraAPIKey // Your RPC URL goes here

const provider = new ethers.providers.JsonRpcProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

addressLookupNameENS();

async function addressLookupNameENS() {

  const address = '0xc1202e7d42655F23097476f6D48006fE56d38d4f';
  const name = await provider.lookupAddress(address);
  console.log(name)

}
