using System; //Will need to install dotnet: https://stackoverflow.com/a/70334945 
using System.Threading.Tasks; //Run with: dotnet run
using Nethereum.Web3; // Install with: dotnet add package Nethereum.Web3

namespace nethereumapp { //Guide: https://www.quicknode.com/guides/ethereum-development/getting-started/connecting-to-blockchains/how-to-connect-to-ethereum-using-net-nethereum/#connecting-with-ethereum
    class Program {
        static void Main(string[] args) {
            GetBlockNumber().Wait();
        }

        static async Task GetBlockNumber() {
            string rpcSepoliaHttps = Environment.GetEnvironmentVariable("sepoliaInfuraHttps") ?? throw new InvalidOperationException();
            var web3 = new Web3(rpcSepoliaHttps);
            var latestBlockNumber = await web3.Eth.Blocks.GetBlockNumber.SendRequestAsync();
            Console.WriteLine($"Latest Block Number is: {latestBlockNumber}");
        }
    }
}