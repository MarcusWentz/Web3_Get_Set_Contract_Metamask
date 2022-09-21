from web3 import Web3
import json
import os
import math
import time

ShardeumConnectionHTTPS = "https://liberty20.shardeum.org/";
web3 = Web3(Web3.HTTPProvider(ShardeumConnectionHTTPS))

chainIdConnected = web3.eth.chain_id
print("chainIdConnected: " + str(chainIdConnected))

devTestnetPrivateKey = str(os.environ['devTestnetPrivateKey']);

userWallet = (web3.eth.account.from_key(devTestnetPrivateKey)).address
print("User Wallet Address: " + userWallet)

Contract_At_Address= web3.toChecksumAddress("0xE8eb488bEe284ed5b9657D5fc928f90F40BC2d57");
abi_Contract = json.loads('[{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"slot0","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]')
contract_Call = web3.eth.contract(address = Contract_At_Address , abi = abi_Contract);

print(contract_Call.functions.slot0().call());

unixTime = int(math.floor( time.time()*(10**3)) )
print("UNIX TIME: " + str(unixTime) )

EIP_2930_tx = {
    'chainId' : chainIdConnected,
    'nonce':  web3.eth.getTransactionCount(userWallet)       ,
    'to': Contract_At_Address, #WORKS WITH REGULAR WALLETS BUT CANNOT SEND TO CONTRACT FOR SOME REASON?
    'gas': 2100000, #WORKS WITH 1000000. If not try : Remix > deploy and run transactions
    'gasPrice': web3.toWei('30', 'gwei'), # https://etherscan.io/gastracker
    'data' : contract_Call.encodeABI(fn_name='set', args=[unixTime]) ,
    'accessList' :
                [
                    {
                        "address" : Contract_At_Address,
                        "storageKeys": [
                            "0x0000000000000000000000000000000000000000000000000000000000000000",
                        ]
                    }
                ]
}

signed_tx = web3.eth.account.signTransaction(EIP_2930_tx, devTestnetPrivateKey)
tx_hash = web3.toHex(web3.eth.sendRawTransaction(signed_tx.rawTransaction))
print("TX HASH: " + tx_hash)

time.sleep(15)

receipt = web3.eth.getTransactionReceipt(tx_hash)
print("TX RECEIPT: " + str(receipt) )
