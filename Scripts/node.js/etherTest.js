const { ethers } = require("ethers");

// If you don't specify a //url//, Ethers connects to the default
// (i.e. ``http:/\/localhost:8545``)
const provider = new ethers.providers.JsonRpcProvider("https://liberty20.shardeum.org/");

const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);


// console.log(wallet)
// // The provider also allows signing transactions to
// // send ether and pay to change state within the blockchain.
// // For this, we need the account signer...
// const signer = provider.wallet()


async function read() {

  // Look up the current block number
  blockNumber = await provider.getBlockNumber()
  // 14983200

  console.log(blockNumber)

  balance = await provider.getBalance("0x66C1d8A5ee726b545576A75380391835F8AAA43c")
  //

  // console.log(balance)

  console.log(ethers.utils.formatEther(balance))

    // Send 1 ether to an ens name.
  const tx = signer.sendTransaction({
      to: "0x66C1d8A5ee726b545576A75380391835F8AAA43c",
      value: ethers.utils.parseEther("1.0")
  });


}



read()
