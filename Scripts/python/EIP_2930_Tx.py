from web3 import Web3
import json
import os

infura_rinkeby_testnet_url_API =  str(os.environ['rinkebyInfuraAPIKey']);
devTestnetPrivateKey = str(os.environ['devTestnetPrivateKey']);
web3 = Web3(Web3.HTTPProvider(infura_rinkeby_testnet_url_API))

print("Connected to Web3? ")
print(web3.isConnected())

# Read information from the blockchain.
print("Current block? ")
print(web3.eth.blockNumber)

balance = web3.eth.getBalance("0xc1202e7d42655F23097476f6D48006fE56d38d4f")
print("Balance [Rinkeby ether]" )
print(web3.fromWei(balance, "ether") )

Contract_At_Address= web3.toChecksumAddress("0xaf3310ec212eCBA069149239F954F1281fDa836B");
abi_Contract = json.loads('[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"date","type":"uint256"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"valueChangeEventWenjs","type":"uint256"}],"name":"setValueUpdatedViaWebjs","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]');
contract_Call = web3.eth.contract(address = Contract_At_Address , abi = abi_Contract);
print(contract_Call.functions.storedData().call());

EIP_2930_tx = {
    'nonce':  web3.eth.getTransactionCount("0xc1202e7d42655F23097476f6D48006fE56d38d4f")       ,
    'to': '0xc1202e7d42655F23097476f6D48006fE56d38d4f', #WORKS WITH REGULAR WALLETS BUT CANNOT SEND TO CONTRACT FOR SOME REASON?
    'gas': 2000000, #WORKS WITH 1000000. If not try : Remix > deploy and run transactions
    # 'gasPrice': web3.toWei('50', 'gwei'), # https://etherscan.io/gastracker
    'maxFeePerGas': 3000000000,
    'maxPriorityFeePerGas': 2000000000,
    'chainId' : 4,
    'accessList' :               [
                    {
                        "address" : "0xaf3310ec212eCBA069149239F954F1281fDa836B",
                        "storageKeys": [
                            "0x0000000000000000000000000000000000000000000000000000000000000000",
                        ]
                    }
                ]

}
signed_tx = web3.eth.account.signTransaction(EIP_1559_tx, devTestnetPrivateKey)
print(web3.toHex(web3.eth.sendRawTransaction(signed_tx.rawTransaction)))
