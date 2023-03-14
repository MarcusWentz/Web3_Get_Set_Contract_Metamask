//Source: https://ethereum.stackexchange.com/questions/131282/ethers-eip712-wont-work-with-strings
const ethers = require("ethers")

const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/")

// const rpcURL = process.env.goerliWebSocketSecureEventsInfuraAPIKey // Your RPC URL goes here
// const provider = new ethers.providers.WebSocketProvider(rpcURL)

const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);
const signerFalse = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKeyTwo, 'hex'), provider);

const domainSeparator = {
  // name: "MinimalForwarder",
  version: "1",
  chainId: 5,
  // chainId: 8082,
  // verifyingContract: contractAddressGoerli,
};

const types = {
  ForwardRequest: [
    { name: 'from', type: 'address' },
    { name: 'to', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'gas', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'data', type: 'bytes' }
  ],
}

const ForwardRequest = {
  from:  "0xFd5aBa459e4Dfa8a68C9a3FA8D7c47CE73a82F1c",
  to:    signer.address,
  value: 0,
  gas:   300000,
  nonce: 0,
  data:  "0x"
}

console.log("ForwardRequest: ", ForwardRequest)

verifySignature();

async function getSignatureWithEIP712() {
  const signatureWithEIP712 = await signer._signTypedData(domainSeparator, types, ForwardRequest);
  return signatureWithEIP712;
}

async function verifySignature() {

  const signatureWithEIP712 = await getSignatureWithEIP712()
  console.log("signatureWithEIP712: ", signatureWithEIP712)

  let recovered_address = await ethers.utils.verifyTypedData(
    domainSeparator,
    types,
    ForwardRequest,
    signatureWithEIP712
  );

  let ethersRecoverAddressCorrect = recovered_address == signer.address;
  console.log("ethers.utils.verifyTypedData recovered address correct:", ethersRecoverAddressCorrect);
  
  let ethersRecoverAddressOtherWallet = recovered_address != signerFalse.address;
  console.log("ethers.utils.verifyTypedData recovered address reject other wallet:", ethersRecoverAddressOtherWallet);

}