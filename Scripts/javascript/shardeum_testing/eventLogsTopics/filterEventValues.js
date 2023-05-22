const ethers = require("ethers")

const rpcURL = process.env.sepoliaInfuraWSS // Your RPC URL goes here

const provider = new ethers.providers.WebSocketProvider(rpcURL)

const contractAddress = '0x6332Be1AE08e9ca4D69f1b69a03194d74fAc29A7'

let eventNameTypeTopicHashed = ethers.utils.id("eventCounter(uint256,uint256,uint256,uint256,uint256,uint256)");
console.log("Computed vs Etherscan eventNameTypeTopicHashed value:")
console.log(eventNameTypeTopicHashed)
console.log("0xe17fd3920d01fd5e94390b54b8612d51d3e0ececece27bb5a2e8708cd62ab549")

eventFilter = {
    address: contractAddress,
    topics: [
        eventNameTypeTopicHashed, //Event name with types hashed 32 bytes.
        "0x0000000000000000000000000000000000000000000000000000000000000003", //Topic [0]
        "0x0000000000000000000000000000000000000000000000000000000000000004", //Topic [1]
        "0x0000000000000000000000000000000000000000000000000000000000000005"  //Topic [2]
    ]
}

console.log("Listen for eventCounter when x = 3 events...")

provider.on(eventFilter, (eventDetected) => {
    console.log("EVENT DETECTED! NEW STATE VALUE:")
    console.log(eventDetected)
    console.log("Listen for eventCounter when x = 3 events...")

})


