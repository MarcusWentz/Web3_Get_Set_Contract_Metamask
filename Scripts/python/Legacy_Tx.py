from web3 import Web3
import json
import os

infura_goerli_testnet_url_API = str(os.environ['goerliHTTPS_InfuraAPIKey']);
web3 = Web3(Web3.HTTPProvider(infura_goerli_testnet_url_API))

# goerli_testnet_url_API = str(os.environ["http://localhost:8545"]);
# web3 = Web3(Web3.HTTPProvider(goerli_testnet_url_API))

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
print("Balance [Goerli ether]" )
print(web3.fromWei(balance, "ether") )

Contract_At_Address= web3.toChecksumAddress("0xdbaA7dfBd9125B7a43457D979B1f8a1Bd8687f37");
abi_Contract = json.loads('[{"anonymous":false,"inputs":[],"name":"setEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]');
contract_Call = web3.eth.contract(address = Contract_At_Address , abi = abi_Contract);
print(contract_Call.functions.storedData().call());

tx = {
    'nonce':  web3.eth.getTransactionCount(userWallet)       ,
    'to': Contract_At_Address, #WORKS WITH REGULAR WALLETS BUT CANNOT SEND TO CONTRACT FOR SOME REASON?
    'gas': 2100000, #WORKS WITH 1000000. If not try : Remix > deploy and run transactions
    'gasPrice': web3.toWei('30', 'gwei'), # https://etherscan.io/gastracker
    'data': contract_Call.encodeABI(fn_name='set', args=[999])
}

signed_tx = web3.eth.account.signTransaction(tx, devTestnetPrivateKey)
print(web3.toHex(web3.eth.sendRawTransaction(signed_tx.rawTransaction)))
