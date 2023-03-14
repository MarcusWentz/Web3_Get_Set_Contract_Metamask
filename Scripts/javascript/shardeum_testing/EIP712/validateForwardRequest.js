//Source: https://ethereum.stackexchange.com/questions/131282/ethers-eip712-wont-work-with-strings
const ethers = require("ethers")

const rpcURL = process.env.goerliWebSocketSecureEventsInfuraAPIKey // Your RPC URL goes here

const provider = new ethers.providers.WebSocketProvider(rpcURL,5)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

const contractAddress = "0xFd5aBa459e4Dfa8a68C9a3FA8D7c47CE73a82F1c";
const contractABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"gas","type":"uint256"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct MinimalForwarder.ForwardRequest","name":"req","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"execute","outputs":[{"internalType":"bool","name":"","type":"bool"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"}],"name":"getNonce","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"gas","type":"uint256"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct MinimalForwarder.ForwardRequest","name":"req","type":"tuple"},{"internalType":"bytes","name":"signature","type":"bytes"}],"name":"verify","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]

const contractDeployed = new ethers.Contract(contractAddress, contractABI, signer);

const domainSeparator = {
  name: "MinimalForwarder",
  version: "1",
  chainId: 5,
  verifyingContract: contractAddress,
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
  from:  signer.address,
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

  // const addressNonce = await contractDeployed.getNonce(
  //   signer.address
  // );
  // console.log(addressNonce)

  const signatureValid = await contractDeployed.verify(
    ForwardRequest,
    signatureWithEIP712
  );
  console.log("MinimalForwarder.sol verify signature: ", signatureValid)
  
}