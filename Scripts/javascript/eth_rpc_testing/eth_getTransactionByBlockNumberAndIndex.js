const ethers = require("ethers");

(async () => {

    const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/");
    const blockNumberHexString = "0x7d0"; //Block 2000
    const blockTxIndexNumberHexString = "0x8"; // Transaction index 9/9 (8 in hexadecimal since we are counting from 0)

    // const provider = new ethers.providers.JsonRpcProvider(process.env.mainnetHTTPS_QuicknodeAPIKey);
    // const blockNumberHexString = "0xc5043f"; //Block 12911679
    // const blockTxIndexNumberHexString = "0xcb"; // Transaction index 204/204 (203 in hexadecimal since we are counting from 0).

    const txByIndex = await provider.send(
        "eth_getTransactionByBlockNumberAndIndex",
        [
            blockNumberHexString,
            blockTxIndexNumberHexString
        ] 
    );
    console.log(txByIndex);

})();

