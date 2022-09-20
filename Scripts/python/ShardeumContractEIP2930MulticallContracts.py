from web3 import Web3
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

# Read information from the blockchain.
print("Current block? ")
print(web3.eth.blockNumber)

balance = web3.eth.getBalance(userWallet)
print("Balance [Shardeum SHM]" )
print(web3.fromWei(balance, "ether") )

Contract_At_Address= web3.toChecksumAddress("0x41Ae7549023a7F0b6Cb7FE4d1807487b18cbAe10");
abi_Contract = json.loads('[{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"multiCall","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"setCallOne","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"callContractToCall","outputs":[{"internalType":"contractcontractToCall","name":"","type":"address"}],"stateMutability":"view","type":"function"}]')
contract_Call = web3.eth.contract(address = Contract_At_Address , abi = abi_Contract);

ContractOneAddress = contract_Call.functions.callContractToCall().call()

EIP_2930_tx = {
    'chainId' : web3.eth.chain_id,
    'nonce':  web3.eth.getTransactionCount(userWallet)       ,
    'to': Contract_At_Address, #WORKS WITH REGULAR WALLETS BUT CANNOT SEND TO CONTRACT FOR SOME REASON?
    'gas': 2100000, #WORKS WITH 1000000. If not try : Remix > deploy and run transactions
    'gasPrice': web3.toWei('30', 'gwei'), # https://etherscan.io/gastracker
    'data' : contract_Call.encodeABI(fn_name='multiCall', args=[777]) ,
    'type' : 1,
    'accessList' :
                [
                    # {
                    #     "address" : userWallet,
                    #     "storageKeys": []
                    # },
                    # {
                    #     "address" : Contract_At_Address,
                    #     "storageKeys": [
                    #         "0x0000000000000000000000000000000000000000000000000000000000000002",
                    #     ]
                    # },
                    {
                        "address" : ContractOneAddress,
                        "storageKeys": [
                            "0x0000000000000000000000000000000000000000000000000000000000000000",
                            "0x6ad388c3c3423bab3b6a72664273d2db94b96db28c3dcb552398a88ee5fa8d1b" ##Code hash from EXTCODEHASH https://blog.finxter.com/how-to-find-out-if-an-ethereum-address-is-a-contract/
                        ]
                    }
                ]
}

signed_tx = web3.eth.account.signTransaction(EIP_2930_tx, devTestnetPrivateKey)
tx_hash = web3.toHex(web3.eth.sendRawTransaction(signed_tx.rawTransaction))
print(tx_hash)

time.sleep(15)

receipt = web3.eth.getTransactionReceipt(tx_hash)
print(receipt)
