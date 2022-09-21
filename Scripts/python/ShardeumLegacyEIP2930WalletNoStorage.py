from web3 import Web3
import json
import os
import time

ShardeumConnectionHTTPS = "https://liberty20.shardeum.org/";
web3 = Web3(Web3.HTTPProvider(ShardeumConnectionHTTPS))

chainIdConnected = web3.eth.chain_id
print("chainIdConnected: " + str(chainIdConnected))

devTestnetPrivateKey = str(os.environ['devTestnetPrivateKey']);

userWallet = (web3.eth.account.from_key(devTestnetPrivateKey)).address
print("User Wallet Address: " + userWallet)

devTestnetPrivateKeyTwo = str(os.environ['devTestnetPrivateKeyTwo']);

transferToWallet = (web3.eth.account.from_key(devTestnetPrivateKeyTwo)).address
print("transferToWallet address: " + transferToWallet)

oneEtherInWeiSHM = "1000000000000000000"
print("weiMsgValueToSend: " + oneEtherInWeiSHM)

userBalance =  web3.eth.getBalance(userWallet);
print("User Balance [Shardeum SHM]" )
print(web3.fromWei(userBalance, "ether"))

receiverBalance =  web3.eth.getBalance(transferToWallet);
print("Receiver Balance [Shardeum SHM]" )
print(web3.fromWei(receiverBalance, "ether"))

transferTx = {
    'chainId' : chainIdConnected,
    'nonce':  web3.eth.getTransactionCount(userWallet)       ,
    'to': transferToWallet, #WORKS WITH REGULAR WALLETS BUT CANNOT SEND TO CONTRACT FOR SOME REASON?
    'gas': 2100000, #WORKS WITH 1000000. If not try : Remix > deploy and run transactions
    'gasPrice': web3.toWei('30', 'gwei'), # https://etherscan.io/gastracker
    'value': int(oneEtherInWeiSHM),
    'accessList' :
                [
                    {
                        "address" : transferToWallet,
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
