const ethers = require("ethers")

const rpcURL = process.env.sepoliaInfuraWSS // Your RPC URL goes here

const provider = new ethers.providers.WebSocketProvider(rpcURL)
const signer = new ethers.Wallet(Buffer.from(process.env.devTestnetPrivateKey, 'hex'), provider);

const contractAddress = '0x6332Be1AE08e9ca4D69f1b69a03194d74fAc29A7'
// const contractABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"a","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"b","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"c","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"d","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"e","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"f","type":"uint256"}],"name":"eventCounter","type":"event"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"storedData","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

// const contractDeployed = new ethers.Contract(contractAddress, contractABI, signer);

filter = {
    address: contractAddress,
//     topics: [
//         // the name of the event, parnetheses containing the data type of each event, no spaces
//         ethers.utils.id("eventCounter(uint256 indexed a, uint256 indexed b, uint256 indexed c, uint256 d, uint256 e, uint256 f)")
//     ]
}

provider.on(filter, (event) => {
    // do whatever you want here
    // I'm pretty sure this returns a promise, so don't forget to resolve it
    console.log("EVENT DETECTED! NEW STATE VALUE:")
    console.log(event)

})


