const ethers = require("ethers");

// const rpcURL = "ws://127.0.0.1:8545"
const rpcURL = process.env.sepoliaInfuraWSS // Your RPC URL goes here

const provider = new ethers.providers.WebSocketProvider(rpcURL)

const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);
// const signer = new ethers.Wallet(Buffer.from(process.env.anvilPrivateKey, 'hex'), provider);

deploy_huff_contract()

async function deploy_huff_contract(){

    // const contractBytecode = "0x"+"6004356024350160005260206000f3";
    const contractBytecode = "0x"+"426000553360015560c78060113d393df360003560e01c80635524107714610032578063209652551461006f578063893d20e81461007b578063c5da17db14610087575b6004358060005414610069576000557fc5ab16f1bddb259b10fe689dea60d8cce8e149cda6275168becc5bc11b2fc35460006000a1005b60006000fd5b60005460005260206000f35b6001546000526014600cf35b33600154146100965760006000fd5b426000557fc5ab16f1bddb259b10fe689dea60d8cce8e149cda6275168becc5bc11b2fc35460006000a10060006000fd";
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