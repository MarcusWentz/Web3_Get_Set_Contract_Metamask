const ethers = require("ethers")

// const rpcURL = process.env.goerliHTTPS_InfuraAPIKey //Goerli
const rpcURL = "https://liberty20.shardeum.org/" //Shardeum Liberty 2.1

const provider = new ethers.providers.JsonRpcProvider(rpcURL)

createAndSendTx();

async function createAndSendTx() {

  const connectedNetworkObject = await provider.getNetwork();
  const chainIdConnected = connectedNetworkObject.chainId;
  console.log("chainIdConnected: "+ chainIdConnected)

  if(chainIdConnected == 5) { //Goerli
    tx_info = await provider.getTransaction("0x7bd590a4c9100402fb105f7de66c28a6236c56f4b254c634e53235958f7f50cc")
    console.log(tx_info)
  }
  if(chainIdConnected == 8081) { //Shardeum Liberty 2.1
    // Success 
    tx_info_decimal_pass = await provider.getTransaction("0x28fc8a687a31ff3a07086b7fc4a7986c758aaaba186387e1502ee1ced1317721") // 9 WEI, works.
    // https://explorer-liberty20.shardeum.org/api/transaction?txHash=0x28fc8a687a31ff3a07086b7fc4a7986c758aaaba186387e1502ee1ced1317721

    console.log(tx_info_decimal_pass)

    // Fail
    tx_info_hexadecimal_fail = await provider.getTransaction("0x08a0e3064c4c195aad793235f23a6dc2959f66f2adbef0b1ba611df4d945069b") // 10 WEI (hexadecimal: "a") works.
    // https://explorer-liberty20.shardeum.org/api/transaction?txHash=0x08a0e3064c4c195aad793235f23a6dc2959f66f2adbef0b1ba611df4d945069b
  
    console.log(tx_info_hexadecimal_fail)
  }

}
