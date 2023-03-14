//Source: https://ethereum.stackexchange.com/questions/131282/ethers-eip712-wont-work-with-strings
const ethers = require("ethers")

const rpcURL = process.env.goerliWebSocketSecureEventsInfuraAPIKey // Your RPC URL goes here

const provider = new ethers.providers.WebSocketProvider(rpcURL,5)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

const contractAddress = "0x3b1B4DAb15c2222Ae2d30dc835235C990d7d515f";

const inName = "just name";
const addressMessage  = signer.address;

const domainSeparator = {
  name: "test",
  version: "1",
  // chainId: Number(id_),
  chainId: 1337,
  verifyingContract: contractAddress,
};

const types = {
  forwardData: [
    { name: "from", type: "address" },
    { name: "name", type: "string" },
  ],
};

const value = {
  from: addressMessage,
  name: inName,
};


getSignature();

async function getSignature() {
  const signature = await signer._signTypedData(domainSeparator, types, value);
  console.log(signature)
}
