from urllib.request import urlopen
import json

transactionsInCycleRangeUrlString = "https://explorer.liberty20.shardeum.org/api/transaction?startCycle=0&endCycle=1000&address=0x0000000000000000000000000000000000000000"
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
