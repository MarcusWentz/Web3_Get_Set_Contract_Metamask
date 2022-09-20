from web3 import Web3
import json
import os
import time

ShardeumConnectionHTTPS = "https://liberty20.shardeum.org/";
web3 = Web3(Web3.HTTPProvider(ShardeumConnectionHTTPS))

devTestnetPrivateKey = str(os.environ['devTestnetPrivateKey']);

userWallet = (web3.eth.account.from_key(devTestnetPrivateKey)).address
print(userWallet)

chainIdConnected = web3.eth.chain_id
print("chainIdConnected: " + str(chainIdConnected))

balance = web3.eth.getBalance(userWallet)
print("Balance [Shardeum SHM]" )
print(web3.fromWei(balance, "ether") )

walletAddressSentMsgValueTo = "0x66C1d8A5ee726b545576A75380391835F8AAA43c"
weiMsgValueToSend = 1

transferTx = {
    'chainId' : chainIdConnected,
    'nonce':  web3.eth.getTransactionCount(userWallet)       ,
    'to': walletAddressSentMsgValueTo, #WORKS WITH REGULAR WALLETS BUT CANNOT SEND TO CONTRACT FOR SOME REASON?
    'gas': 2100000, #WORKS WITH 1000000. If not try : Remix > deploy and run transactions
    'gasPrice': web3.toWei('30', 'gwei'), # https://etherscan.io/gastracker
    'value': weiMsgValueToSend,
    'accessList' :
                [
                    {
                        "address" : walletAddressSentMsgValueTo,
                        "storageKeys": []
                    }
                ]
}

signed_tx = web3.eth.account.signTransaction(transferTx, devTestnetPrivateKey)
tx_hash = web3.toHex(web3.eth.sendRawTransaction(signed_tx.rawTransaction))
print("TX HASH: " + tx_hash)

time.sleep(15)

receipt = web3.eth.getTransactionReceipt(tx_hash)
print("TX RECEIPT: " + str(receipt) )
