const ethers = require("ethers")

const rpcURL = process.env.sepoliaInfuraWSS // Your RPC URL goes here

const provider = new ethers.providers.WebSocketProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

const contractAddress = '0x6332Be1AE08e9ca4D69f1b69a03194d74fAc29A7'
// const contractABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"a","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"b","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"c","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"d","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"e","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"f","type":"uint256"}],"name":"eventCounter","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

// const contractDeployed = new ethers.Contract(contractAddress, contractABI, signer);

let eventNameTypeTopicHashed = ethers.utils.id("eventCounter(uint256,uint256,uint256,uint256,uint256,uint256)");
console.log("Computed vs Etherscan eventNameTypeTopicHashed value:")
console.log(eventNameTypeTopicHashed)
console.log("0xe17fd3920d01fd5e94390b54b8612d51d3e0ececece27bb5a2e8708cd62ab549")

filter = {
    address: contractAddress,
    topics: [
        eventNameTypeTopicHashed, //Event name with types hashed 32 bytes.
        "0x0000000000000000000000000000000000000000000000000000000000000003", //Topic [0]
        "0x0000000000000000000000000000000000000000000000000000000000000004", //Topic [1]
        "0x0000000000000000000000000000000000000000000000000000000000000005"  //Topic [2]
    ]
}

provider.on(filter, (event) => {
    console.log("EVENT DETECTED! NEW STATE VALUE:")
    console.log(event)

})


