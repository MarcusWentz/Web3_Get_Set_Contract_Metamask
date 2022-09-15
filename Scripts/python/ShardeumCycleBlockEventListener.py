from web3 import Web3
import math
import json
import os
import time

# infura_goerli_testnet_url_API = str(os.environ['goerliHTTPS_InfuraAPIKey']);

ShardeumConnectionHTTPS = "https://liberty20.shardeum.org/";
web3 = Web3(Web3.HTTPProvider(ShardeumConnectionHTTPS))

devTestnetPrivateKey = str(os.environ['devTestnetPrivateKey']);

userWallet = (web3.eth.account.from_key(devTestnetPrivateKey)).address
print(userWallet)

print("Connected to Web3? ")
print(web3.isConnected())

print("Chain ID? ")
print(web3.eth.chain_id)

# # Read information from the blockchain.
# print("Current blocks? ")
# print(web3.eth.blockNumber)

balance = web3.eth.getBalance(userWallet)
print("Balance [Shardeum SHM]" )
print(web3.fromWei(balance, "ether") )

while True:
    print("Current cycle (1 cycle = 10 blocks) ")
    cycle =  (math.floor(web3.eth.blockNumber/10))  #Divide current block number by 10, then round down to get cycle.
    print(cycle)
    time.sleep(60)   #1 cycle roughly every 60 seconds based on explorer: https://explorer.liberty20.shardeum.org/cycle
