const ethers = require("ethers");

//Goerli
const provider = new ethers.providers.JsonRpcProvider(process.env.goerliHTTPS_InfuraAPIKey)
const contractAddress = '0x080FfD52b6c217C1B69a03446f2956580e25fd43'

//Mumbai
// const provider = new ethers.providers.JsonRpcProvider(process.env.mumbaiInfuraHTTPS)
// const contractAddress = '0x0a68F4C49635A4364f9E5e6E0CD9730078f7f4FD'

//Betanet 1.X
// const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/")
// const contractAddress = '0x18e9437821bD2c69A5bCee1896eD18995E5a6A85'

//Liberty 2.X
// const provider = new ethers.providers.JsonRpcProvider("https://liberty20.shardeum.org/")
// const contractAddress = '0x6f943CC8c541961ecDe22b4c917e23903cE0151a'

//Liberty 1.X
// const provider = new ethers.providers.JsonRpcProvider("https://liberty10.shardeum.org/")
// const contractAddress = '0x886A2bc0507C29A3685980d3E02BE8f07A94f903'

getCodeFromContractAddressLatestBlock();

async function getCodeFromContractAddressLatestBlock() {

  const code = await provider.getCode(contractAddress,"latest");
  console.log(code);
  
}