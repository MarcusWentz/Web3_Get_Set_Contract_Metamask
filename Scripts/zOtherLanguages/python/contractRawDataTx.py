from web3 import Web3
import json
import os
import time

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

Contract_At_Address= web3.to_checksum_address("0xeD62F27e9e886A27510Dc491F5530996719cEd3d");
abi_Contract = json.loads('[{"anonymous":false,"inputs":[],"name":"setEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]');
contract_Call = web3.eth.contract(address = Contract_At_Address , abi = abi_Contract);
print(contract_Call.functions.storedData().call());

currentUnixTime = round(time.time())
print(round(currentUnixTime))

# Raw tx

tx = {
    'chainId': web3.eth.chain_id,
    'nonce':  web3.eth.get_transaction_count(userWallet),
    'to': Contract_At_Address, 
    'data': contract_Call.encode_abi(abi_element_identifier='set', args=[currentUnixTime]),
    'gas': 30000, 
    'gasPrice': web3.eth.gas_price # https://etherscan.io/gastracker
}

signed_tx = web3.eth.account.sign_transaction(tx, devTestnetPrivateKey)
print(web3.to_hex(web3.eth.send_raw_transaction(signed_tx.raw_transaction)))
