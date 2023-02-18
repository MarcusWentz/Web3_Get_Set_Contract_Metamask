const ethers = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(process.env.goerliHTTPS_InfuraAPIKey)
const contractAddress = "0x161aeb4245695855a0e3ef43a437639d08118a1d"
const contractDeployedBlock = 8514256
const contractFirstTransactionBlock = 8514265

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