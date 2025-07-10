const ethers = require("ethers");

const provider = new ethers.providers.JsonRpcProvider("https://eth.drpc.org")
// const provider = new ethers.providers.JsonRpcProvider("https://unichain.drpc.org")

// const contractAddress = "0xf8A18650c8A5eFb97E2A7B5D2A181e63b8a167E8"
// const contractFromBlock= 20811415
// const contractToBlock = 21357177 

getLogsWithEventIndex();

async function getLogsWithEventIndex() {

  const filter = {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
  };
  const response = await provider.getLogs(filter);
  console.log(response);
  console.log(response[0]);

  // const filter = {
  //   address: '0xf8A18650c8A5eFb97E2A7B5D2A181e63b8a167E8' //,
  //     //  fromBlock: contractFromBlock,
  // //  toBlock: contractToBlock,
  // };
  // const response = await provider.getLogs(filter);
  // console.log(response);

//   // const addressTransactionLogs = await provider.getLogs({
//   //  address: contractAddress,
//   //  fromBlock: contractFromBlock,
//   //  toBlock: contractToBlock,
//   // });

//   // console.log("event one() emitted at logIndex: " + addressTransactionLogs[0]);
//   // console.log("event two() emitted at logIndex: " + addressTransactionLogs[1].logIndex);
//   // console.log("event three() emitted at logIndex: " + addressTransactionLogs[2].logIndex);
//   // console.log("event four() emitted at logIndex: " + addressTransactionLogs[3].logIndex);

}
