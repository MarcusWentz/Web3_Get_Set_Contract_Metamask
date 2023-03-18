const ethers = require("ethers");

(async () => {

    const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/");
    const blockHashHexString = "0xf2a9a9aa1e71d24f0f072f7ee3a2a46df1dd5b30ecdf44aa4742372470ebd1a4"; //Block 2000
    const blockTxIndexNumberHexString = "0x8"; // Transaction index 9/9 (8 in hexadecimal since we are counting from 0)

    // const provider = new ethers.providers.JsonRpcProvider(process.env.mainnetHTTPS_QuicknodeAPIKey);
    // const blockHashHexString = "0xa917fcc721a5465a484e9be17cda0cc5493933dd3bc70c9adbee192cb419c9d7"; //Block 12911679
    // const blockTxIndexNumberHexString = "0xcb"; // Transaction index 204/204 (203 in hexadecimal since we are counting from 0).

    const txByIndex = await provider.send(
        "eth_getTransactionByBlockHashAndIndex",
        [
            blockHashHexString,
            blockTxIndexNumberHexString
        ] 
    );
    console.log(txByIndex);

})();