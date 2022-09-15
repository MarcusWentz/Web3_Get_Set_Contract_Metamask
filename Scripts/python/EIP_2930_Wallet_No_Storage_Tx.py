from web3 import Web3
import json
import os

infura_goerli_testnet_url_API = str(os.environ['goerliHTTPS_InfuraAPIKey']);
web3 = Web3(Web3.HTTPProvider(infura_goerli_testnet_url_API))

devTestnetPrivateKey = str(os.environ['devTestnetPrivateKey']);

userWallet = (web3.eth.account.from_key(devTestnetPrivateKey)).address
print(userWallet)

print("Connected to Web3? ")
print(web3.isConnected())

# Read information from the blockchain.
print("Current block? ")
print(web3.eth.blockNumber)

print("Chain ID? ")
print(web3.eth.chain_id)

balance = web3.eth.getBalance(userWallet)
print("Balance [Goerli ether]" )
print(web3.fromWei(balance, "ether") )

walletAddressSentMsgValueTo = "0x66C1d8A5ee726b545576A75380391835F8AAA43c"
weiMsgValueToSend = 1

EIP_2930_tx = {
    'nonce':  web3.eth.getTransactionCount(userWallet)       ,
    'to': walletAddressSentMsgValueTo, #WORKS WITH REGULAR WALLETS BUT CANNOT SEND TO CONTRACT FOR SOME REASON?
    'gas': 2100000, #WORKS WITH 1000000. If not try : Remix > deploy and run transactions
    'maxFeePerGas': web3.toWei(30, 'gwei'),
    'maxPriorityFeePerGas':  web3.toWei(20, 'gwei'),
    'chainId' : web3.eth.chain_id,
    'value' : weiMsgValueToSend,
    'accessList' :
                [
                    {
                        "address" : walletAddressSentMsgValueTo,
                        "storageKeys": []
                    }
                ]

}

signed_tx = web3.eth.account.signTransaction(EIP_2930_tx, devTestnetPrivateKey)
print(web3.toHex(web3.eth.sendRawTransaction(signed_tx.rawTransaction)))
