from web3 import Web3
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
print("Current block? ")
print(web3.eth.blockNumber)

balance = web3.eth.getBalance("0xc1202e7d42655F23097476f6D48006fE56d38d4f")
print("Balance [Shardeum SHM]" )
print(web3.fromWei(balance, "ether") )

# Contract_At_Address= web3.toChecksumAddress("0xdbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37");
# abi_Contract = json.loads('[{"anonymous":false,"inputs":[],"name":"setEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]');
# contract_Call = web3.eth.contract(address = Contract_At_Address , abi = abi_Contract);
# print(contract_Call.functions.storedData().call());
walletAddressSentMsgValueTo = "0x66C1d8A5ee726b545576A75380391835F8AAA43c"
weiMsgValueToSend = 1

tx = {
    'chainId' : web3.eth.chain_id,
    'nonce':  web3.eth.getTransactionCount(userWallet)       ,
    'to': walletAddressSentMsgValueTo, #WORKS WITH REGULAR WALLETS BUT CANNOT SEND TO CONTRACT FOR SOME REASON?
    'gas': 30000, #WORKS WITH 1000000. If not try : Remix > deploy and run transactions
    'gasPrice': web3.toWei('10', 'gwei'), # https://etherscan.io/gastracker
    'value': weiMsgValueToSend,
    'accessList' :
                [
                    {
                        "address" : walletAddressSentMsgValueTo,
                        "storageKeys": []
                    }
                ]
}

signed_tx = web3.eth.account.signTransaction(tx, devTestnetPrivateKey)
print(web3.toHex(web3.eth.sendRawTransaction(signed_tx.rawTransaction)))
