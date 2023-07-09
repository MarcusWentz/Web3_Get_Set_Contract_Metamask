const ethers = require("ethers");

// const rpcURL = "ws://127.0.0.1:8545"
const rpcURL = process.env.sepoliaInfuraWSS // Your RPC URL goes here

const provider = new ethers.providers.WebSocketProvider(rpcURL)

const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);
// const signer = new ethers.Wallet(Buffer.from(process.env.anvilPrivateKey, 'hex'), provider);

deploy_lll_contract()

async function deploy_lll_contract(){

    const contractBytecode = "0x426000553360015560006000a07fc5ab16f1bddb259b10fe689dea60d8cce8e149cda6275168becc5bc11b2fc35460006000a100";
    const txData = contractBytecode;

    tx = await signer.sendTransaction({
        data: txData,
        gasLimit: ethers.utils.hexlify(5000000), 
    });

    console.log(tx)
}
