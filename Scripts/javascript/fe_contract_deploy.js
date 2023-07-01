const ethers = require("ethers");

const rpcURL = process.env.sepoliaInfuraWSS // Your RPC URL goes here
const provider = new ethers.providers.WebSocketProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

deploy_fe_contract()

async function deploy_fe_contract(){

    const contractBytecode = "0x"+"604f8038039060405180156046575b82810160405239600180546001600160601b03163360601b6001600160601b0319161790554260009081556001908190604e90396000f35b506060600e56fe00";
    const contractAbi = [{"type":"constructor","name":"__init__","inputs":[],"outputs":[],"stateMutability":"payable"},{"type":"event","name":"error_same_value","inputs":[],"anonymous":false},{"type":"event","name":"event_value_update","inputs":[{"name":"value","type":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Context","inputs":[],"anonymous":false}];
    console.log("contractAbi " + contractAbi)
    // const constructorEncodedData = contractAbi.ethers.encodeDeploy(); //No constructor arguments.
    // const txData = hexlify(concat([contractBytecode, constructorEncodedData]));
    const txData = contractBytecode;

    tx = await signer.sendTransaction({
        data: txData,
        gasLimit: ethers.utils.hexlify(5000000), 
    });

    console.log(tx)
}
