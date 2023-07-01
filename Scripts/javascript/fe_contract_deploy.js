const ethers = require("ethers");

const rpcURL = process.env.sepoliaInfuraWSS // Your RPC URL goes here
const provider = new ethers.providers.WebSocketProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

deploy_fe_contract()

async function deploy_fe_contract(){

    const contractBytecode = "0x"+"610098803803906040518015610049575b82810160405239600180546001600160601b03163360601b6001600160601b031916179055426000908155604690819061005290396000f35b50606061001056fe60003560e01c8063858767ec14602d57638da5cb5b14601a57005b602060015460601c60286035565b908152f35b602060005460285b604051908115604057565b6060915056";
    const contractAbi = [{"type":"constructor","name":"__init__","inputs":[],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"storage_slot_0","inputs":[],"outputs":[{"name":"","type":"uint256"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address"}],"stateMutability":"view"},{"type":"event","name":"error_same_value","inputs":[],"anonymous":false},{"type":"event","name":"event_value_update","inputs":[{"name":"value","type":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Context","inputs":[],"anonymous":false}];
    console.log("contractAbi " + contractAbi);
    // const constructorEncodedData = contractAbi.ethers.encodeDeploy(); //No constructor arguments.
    // const txData = hexlify(concat([contractBytecode, constructorEncodedData]));
    const txData = contractBytecode;

    tx = await signer.sendTransaction({
        data: txData,
        gasLimit: ethers.utils.hexlify(5000000), 
    });

    console.log(tx)
}
