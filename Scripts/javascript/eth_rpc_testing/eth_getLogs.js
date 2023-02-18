const ethers = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(process.env.goerliHTTPS_InfuraAPIKey)
const contractAddress = "0xFe8D44E8bf225e0dB34540d4B9E0C15C111d9a35"
const contractDeployedBlock = 8513469
const contractFirstTransactionBlock = 8513470

getLogsWithEventIndex();

async function getLogsWithEventIndex() {

  const addressTransactionLogs = await provider.getLogs({
   address: contractAddress,
   fromBlock:contractDeployedBlock,
   toBlock:contractFirstTransactionBlock,
  });

  console.log("event one() emitted at logIndex: " + addressTransactionLogs[0].logIndex);
  console.log("event two() emitted at logIndex: " + addressTransactionLogs[1].logIndex);
  console.log("event three() emitted at logIndex: " + addressTransactionLogs[2].logIndex);
  console.log("event four() emitted at logIndex: " + addressTransactionLogs[3].logIndex);

}