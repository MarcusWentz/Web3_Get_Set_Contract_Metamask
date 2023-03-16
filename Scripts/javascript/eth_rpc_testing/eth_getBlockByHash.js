const ethers = require("ethers");

(async () => {

  const provider = new ethers.providers.JsonRpcProvider("https://sphinx.shardeum.org/");
  const blockHash = "0x8e084463bf192349feb8121c1e1de708ebb30701854cbce3a137b8fb8336cda5" //Cycle 42620
  const blockHashCompare = "0x22e28e838b87f410f40ba7e2a07f713bdf4940abde9ba99b714f2810b828b972" //Cycle 0

  // const provider = new ethers.providers.JsonRpcProvider(process.env.mainnetHTTPS_QuicknodeAPIKey);
  // const blockHash = "0x829df9bb801fc0494abf2f443423a49ffa32964554db71b098d332d87b70a48b" // Block 12909192
  // const blockHashCompare = "0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3" //Block 0

  const blockData = await provider.getBlock(
    blockHash,
    false
  );
  console.log(blockData);

  const blockDataCompare = await provider.getBlock(
    blockHashCompare,
    false
  );
  console.log(blockDataCompare);

  // console.log(JSON.stringify(blockData))
  // console.log(JSON.stringify(blockDataCompare))

  delete blockData.timestamp
  delete blockDataCompare.timestamp
  const blockDataStringRemoveTimestamp = JSON.stringify(blockData);
  const blockDataCompareStringRemoveTimestamp = JSON.stringify(blockDataCompare);
  console.log(blockDataStringRemoveTimestamp)
  console.log(blockDataCompareStringRemoveTimestamp)

  if ( blockDataStringRemoveTimestamp == blockDataCompareStringRemoveTimestamp ) {
    console.log("🔴 Test failed!. Block data from block hash is identical with timestamp removed.")
  } else {
    console.log("🟢 Test successful! Block data from block hash is different with timestamp removed.")
  }

})();