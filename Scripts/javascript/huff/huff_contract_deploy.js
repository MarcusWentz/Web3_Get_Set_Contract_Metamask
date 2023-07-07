const ethers = require("ethers");

const rpcURL = "ws://127.0.0.1:8545"
// const rpcURL = process.env.sepoliaInfuraWSS // Your RPC URL goes here

const provider = new ethers.providers.WebSocketProvider(rpcURL)


// const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);
const signer = new ethers.Wallet(Buffer.from(process.env.anvilPrivateKey, 'hex'), provider);

deploy_fe_contract()

async function deploy_fe_contract(){

    // const contractBytecode = "0x"+"6004356024350160005260206000f3";
    const contractBytecode = "0x"+"42600055604480600d3d393df360003560e01c8063552410771461001c5780632096525514610033575b600435806000541461002d57600055005b60006000fd5b60005460005260206000f360006000fd";
    // const contractAbi = [{"constructor":null,"functions":{"add":{"name":"add","inputs":[{"name":"","kind":{"Uint":256},"internal_type":null},{"name":"","kind":{"Uint":256},"internal_type":null}],"outputs":[{"name":"","kind":{"Uint":256},"internal_type":null}],"constant":false,"state_mutability":"NonPayable"}},"events":{},"errors":{},"receive":false,"fallback":false}]
    // console.log("contractAbi " + contractAbi);
    // const constructorEncodedData = contractAbi.ethers.encodeDeploy(); //No constructor arguments.
    // const txData = hexlify(concat([contractBytecode, constructorEncodedData]));
    const txData = contractBytecode;

    tx = await signer.sendTransaction({
        data: txData,
        gasLimit: ethers.utils.hexlify(5000000), 
    });

    console.log(tx)
}
