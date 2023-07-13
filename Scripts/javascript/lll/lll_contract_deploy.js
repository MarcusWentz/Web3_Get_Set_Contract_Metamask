const ethers = require("ethers");

// const rpcURL = "ws://127.0.0.1:8545"
const rpcURL = process.env.sepoliaInfuraWSS // Your RPC URL goes here

const provider = new ethers.providers.WebSocketProvider(rpcURL)

const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);
// const signer = new ethers.Wallet(Buffer.from(process.env.anvilPrivateKey, 'hex'), provider);

deploy_lll_contract()

async function deploy_lll_contract(){

    const contractBytecode = "0x" + "341561000b5760006000fd5b4260005533600155607a806100226000396000f300fe3415600a5760006000fd5b600060005260046000601c600001376320965255600051141560325760005460005260206000f35b63893d20e86000511415604b5760015460005260206000f35b63552410776000511415606057600435600055005b63c5da17db600051141560735742600055005b60006000fd00";
    const txData = contractBytecode; //No constructor arguments to keep bytecode simple.

    tx = await signer.sendTransaction({
        data: txData,
        gasLimit: ethers.utils.hexlify(5000000), 
    });

    console.log(tx)
}
