from web3 import Web3
import time
import math
from urllib.request import urlopen
import json

ShardeumConnectionHTTPS = "https://liberty20.shardeum.org/";
web3 = Web3(Web3.HTTPProvider(ShardeumConnectionHTTPS))

print("Connected to Web3? ")
print(web3.isConnected())

print("Chain ID? ")
print(web3.eth.chain_id)

addressToSubscribeTo = "0x0000000000000000000000000000000000000000"

while True:
    print("Current cycle (1 cycle = 10 blocks [bundles]) ")
    cycle =  (math.floor(web3.eth.blockNumber/10))  #Divide current bundle [block] by 10, then round down to get cycle.
    print(cycle)

    transactionsInCycleRangeUrlString = "https://explorer.liberty20.shardeum.org/api/transaction?startCycle=" + str(cycle) + "&endCycle=" + str(cycle) + "&address=" + addressToSubscribeTo
    print(transactionsInCycleRangeUrlString)
    transactionsInCycleRangeUrlOpened = urlopen(transactionsInCycleRangeUrlString)
    transactionsInCycleRangeUrlJSON = json.loads(transactionsInCycleRangeUrlOpened.read())
    totalTransactions = transactionsInCycleRangeUrlJSON["totalTransactions"]
    print(totalTransactions)
    pageIndex = 1

    while totalTransactions > 0:
        print(pageIndex)
        print(totalTransactions)
        pageIndexIncrementUrlString = transactionsInCycleRangeUrlString + "&page=" + str(pageIndex)
        pageIndexIncrementUrlOpened = urlopen(pageIndexIncrementUrlString)
        rawTransactionDataPage = json.loads(pageIndexIncrementUrlOpened.read())
        print(rawTransactionDataPage)
        totalTransactions -= 10
        pageIndex += 1

    time.sleep(60)   #1 cycle roughly every 60 seconds based on explorer: https://explorer.liberty20.shardeum.org/cycle
