# web3.py documentation: https://web3py.readthedocs.io/en/stable/
# https://web3py.readthedocs.io/en/stable/providers.html#using-persistent-connection-providers
import asyncio
from web3 import (
    Web3,
    AsyncWeb3,
) 
from web3.providers.persistent import (
    AsyncIPCProvider,
    WebSocketProvider,
)
import json
import time
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

contract_address= web3.to_checksum_address("0xeD62F27e9e886A27510Dc491F5530996719cEd3d");
contract_abi = json.loads('[{"anonymous":false,"inputs":[],"name":"setEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]');
contract_instance = web3.eth.contract(address = contract_address , abi = contract_abi);
print(contract_instance.functions.storedData().call());

currentUnixTime = round(time.time())
print(round(currentUnixTime))

# Raw tx

# tx = {
#     'chainId': web3.eth.chain_id,
#     'nonce':  web3.eth.get_transaction_count(userWallet),
#     'to': Contract_At_Address, 
#     'data': contract_Call.encodeABI(fn_name='set', args=[currentUnixTime]),
#     'gas': 30000, 
#     'gasPrice': web3.eth.gas_price # https://etherscan.io/gastracker
# }

# Will send an EIP-1559 tx
tx = contract_instance.functions.set(currentUnixTime).build_transaction(
    {'nonce': web3.eth.get_transaction_count(userWallet)}
)

print(tx)

signed_tx = web3.eth.account.sign_transaction(tx, devTestnetPrivateKey)
print(web3.to_hex(web3.eth.send_raw_transaction(signed_tx.raw_transaction)))

infura_base_sepolia_testnet_url_API = str(os.environ['baseSepoliaWSS']);

# # LOG = True  # toggle debug logging
# LOG = False  # toggle debug logging
# if LOG:
#     import logging
#     # logger = logging.getLogger("web3.providers.AsyncIPCProvider")  # for the AsyncIPCProvider
#     logger = logging.getLogger("web3.providers.WebSocketProvider")  # for the WebSocketProvider
#     logger.setLevel(logging.DEBUG)
#     logger.addHandler(logging.StreamHandler())

# https://web3py.readthedocs.io/en/stable/filters.html#events-and-logs
async def subscribe_to_transfer_events():
    async with AsyncWeb3(WebSocketProvider(infura_base_sepolia_testnet_url_API)) as w3:  # for the WebSocketProvider
        transfer_event_topic = w3.keccak(text="setEvent()")
        filter_params = {
            "address": contract_address,
            "topics": [transfer_event_topic],
        }
        subscription_id = await w3.eth.subscribe("logs", filter_params)
        print(f"Subscribing to transfer events for contract_address with filter topics at {subscription_id}")

        async for payload in w3.socket.process_subscriptions():
            result = payload["result"]
            print("NEW EVENT DETECTED!")
            print(result)
            print(contract_instance.functions.storedData().call());
            # continue
            # break

            # from_addr = decode(["address"], result["topics"][1])[0]
            # to_addr = decode(["address"], result["topics"][2])[0]
            # amount = decode(["uint256"], result["data"])[0]
            # print(f"{w3.from_wei(amount, 'ether')} WETH from {from_addr} to {to_addr}")


 

asyncio.run(subscribe_to_transfer_events())