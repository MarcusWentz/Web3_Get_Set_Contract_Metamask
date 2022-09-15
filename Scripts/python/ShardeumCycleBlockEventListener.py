from web3 import Web3
import math
import json
import os

# infura_goerli_testnet_url_API = str(os.environ['goerliHTTPS_InfuraAPIKey']);

ShardeumConnectionHTTPS = "https://liberty20.shardeum.org/";
web3 = Web3(Web3.HTTPProvider(ShardeumConnectionHTTPS))

devTestnetPrivateKey = str(os.environ['devTestnetPrivateKey']);

userWallet = "0xc1202e7d42655F23097476f6D48006fE56d38d4f"

print("Connected to Web3? ")
print(web3.isConnected())

print("Chain ID? ")
print(web3.eth.chain_id)

# Read information from the blockchain.
print("Current cycle (1 cycle = 10 blocks) ")
print(math.floor(web3.eth.blockNumber/10)) #Round down to get cycle.

# # Read information from the blockchain.
# print("Current blocks? ")
# print(web3.eth.blockNumber)

balance = web3.eth.getBalance(userWallet)
print("Balance [Shardeum SHM]" )
print(web3.fromWei(balance, "ether") )
