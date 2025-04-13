from web3 import Web3
import json
import os

infura_base_sepolia_testnet_url_API = str(os.environ['baseSepoliaHTTPS']);
web3 = Web3(Web3.HTTPProvider(infura_base_sepolia_testnet_url_API))

# goerli_testnet_url_API = str(os.environ["http://localhost:8545"]);
# web3 = Web3(Web3.HTTPProvider(goerli_testnet_url_API))

devTestnetPrivateKey = str(os.environ['devTestnetPrivateKey']);

userWallet = (web3.eth.account.from_key(devTestnetPrivateKey)).address
print(userWallet)

print("Connected to Web3? ")
print(web3.is_connected())

print("Chain ID? ")
print(web3.eth.chain_id)

# Read information from the blockchain.
print("Current block? ")
print(web3.eth.block_number)

# Read information from the blockchain.
print("Gas price? ")
print(web3.eth.gas_price)

balance = web3.eth.get_balance(userWallet)
print("Balance [Base Sepolia ether]" )
print(web3.from_wei(balance, "ether") )

# Raw tx

tx = {
    'chainId': web3.eth.chain_id,
    'nonce':  web3.eth.get_transaction_count(userWallet),
    'to': userWallet, 
    'gas': 21000, 
    'gasPrice': web3.eth.gas_price, # https://etherscan.io/gastracker
    'value': 1
}

signed_tx = web3.eth.account.sign_transaction(tx, devTestnetPrivateKey)
print(web3.to_hex(web3.eth.send_raw_transaction(signed_tx.raw_transaction)))
