const ethers = require("ethers");

// const rpcURL = "ws://127.0.0.1:8545"
const rpcURL = process.env.sepoliaInfuraWSS // Your RPC URL goes here

const provider = new ethers.providers.WebSocketProvider(rpcURL)

const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);
// const signer = new ethers.Wallet(Buffer.from(process.env.anvilPrivateKey, 'hex'), provider);

deploy_lll_contract()

async function deploy_lll_contract(){

    const contractBytecode = "0x" + "341561000b5760006000fd5b426000553360015560e7806100226000396000f300fe3415600a5760006000fd5b600060005260046000601c600001376320965255600051141560325760005460005260206000f35b63893d20e86000511415604b5760015460005260206000f35b63552410776000511415609757600054600435141560695760006000fd5b6004356000557fc5ab16f1bddb259b10fe689dea60d8cce8e149cda6275168becc5bc11b2fc35460006000a1005b63c5da17db600051141560e0576001543314151560b45760006000fd5b426000557fc5ab16f1bddb259b10fe689dea60d8cce8e149cda6275168becc5bc11b2fc35460006000a1005b60006000fd00";
    const txData = contractBytecode; //No constructor arguments to keep bytecode simple.

    tx = await signer.sendTransaction({
        data: txData,
        gasLimit: ethers.utils.hexlify(5000000), 
    });

    console.log(tx)
}
