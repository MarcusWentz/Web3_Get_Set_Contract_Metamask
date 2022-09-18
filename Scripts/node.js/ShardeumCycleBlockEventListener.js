const Web3 = require('web3')

const rpcURL = "https://liberty20.shardeum.org/"
const web3 = new Web3(rpcURL)

console.log("chainId:")
web3.eth.getChainId().then(console.log);

let addressToSubscribeTo = "0x0000000000000000000000000000000000000000"

const timeMilliSec = 1000; //2 seconds per value

function timeout(ms) {
	return new Promise(resolve => setTimeout(resolve,ms));
}

async function listForCycle() {
  while (true){

    console.log("Current cycle (1 cycle = 10 blocks [bundles]) ")
    let cycle = await web3.eth.getBlockNumber();
    console.log(cycle)
    console.log(Math.floor(cycle/10))

    await timeout(1*timeMilliSec)

  }
}

listForCycle()

/////////////////////////////////////PYTHON:

    // transactionsInCycleRangeUrlString = "https://explorer.liberty10.shardeum.org/api/transaction?startCycle=" + str(cycle) + "&endCycle=" + str(cycle) + "&address=" + addressToSubscribeTo
    // print(transactionsInCycleRangeUrlString)
    // transactionsInCycleRangeUrlOpened = urlopen(transactionsInCycleRangeUrlString)
    // transactionsInCycleRangeUrlJSON = json.loads(transactionsInCycleRangeUrlOpened.read())
    // totalTransactions = transactionsInCycleRangeUrlJSON["totalTransactions"]
    // print(totalTransactions)
    // pageIndex = 1
    //
    // while totalTransactions > 0:
    //     print(pageIndex)
    //     print(totalTransactions)
    //     pageIndexIncrementUrlString = transactionsInCycleRangeUrlString + "&page=" + str(pageIndex)
    //     pageIndexIncrementUrlOpened = urlopen(pageIndexIncrementUrlString)
    //     rawTransactionDataPage = json.loads(pageIndexIncrementUrlOpened.read())
    //     print(rawTransactionDataPage)
    //     totalTransactions -= 10
    //     pageIndex += 1
