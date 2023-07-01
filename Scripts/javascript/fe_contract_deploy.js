const ethers = require("ethers");

const rpcURL = process.env.sepoliaInfuraWSS // Your RPC URL goes here
const provider = new ethers.providers.WebSocketProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

deploy_fe_contract()

async function deploy_fe_contract(){

    const contractBytecode = "0x"+"6101fc80380390604051801561004a575b82810160405239600180546001600160601b03163360601b6001600160601b0319161790554260009081556101a990819061005390396000f35b50606061001056fe6000803560e01c8063858767ec146100935780638da5cb5b1461007e57806360fe47b11461003f57635e99d937146100345780f35b61003c6100fa565b80f35b5060231936016100545761003c60043561009f565b602461005e610154565b80516001600160e01b0316632e36a70960e01b1781526101036004820152fd5b602060015460601c61008e610154565b908152f35b6020825461008e610154565b60ff600054821416806001146100f557156100b75750565b602081600080516020610189833981519152926000558060405180156100ed575b838101604052526100e7610154565b908152a1565b5060606100d8565b610166565b60ff60015460601c33141516806001146100f5571561011557565b42600055604051801561014c575b602081016040524290526000805160206101898339815191526020610146610154565b428152a1565b506060610123565b60405190811561016057565b60609150565b6004610170610154565b80516001600160e01b0316632d81145560e01b178152fdfe3092e6cbf976dee704cb20c0bc79e4e026d4adde438af5a96f29bbfd64539aeb";
    const contractAbi = [{"type":"constructor","name":"__init__","inputs":[],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"storage_slot_0","inputs":[],"outputs":[{"name":"","type":"uint256"}],"stateMutability":"view"},{"type":"function","name":"owner","inputs":[],"outputs":[{"name":"","type":"address"}],"stateMutability":"view"},{"type":"function","name":"set","inputs":[{"name":"input","type":"uint256"}],"outputs":[],"stateMutability":"payable"},{"type":"function","name":"owner_time_store","inputs":[],"outputs":[],"stateMutability":"payable"},{"type":"event","name":"error_same_value","inputs":[],"anonymous":false},{"type":"event","name":"event_value_update","inputs":[{"name":"value","type":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Context","inputs":[],"anonymous":false}];
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
