using System;
using System.Threading.Tasks;
using Nethereum.JsonRpc.WebSocketClient;
using Nethereum.Web3;
using Nethereum.Web3.Accounts.Managed;

namespace nethereumapp {
    class Program {
        static void Main(string[] args){
            GetBlockNumberViaWebSocketAsync().Wait();
        }

        public static async Task GetBlockNumberViaWebSocketAsync(){
            string rpcSepoliaWss = Environment.GetEnvironmentVariable("sepoliaInfuraWSS") ?? throw new InvalidOperationException();
            using(var clientws = new WebSocketClient(rpcSepoliaWss))
            { 
                var web3ws = new Web3(clientws);
                var blockNumber = await web3ws.Eth.Blocks.GetBlockNumber.SendRequestAsync(); //task cancelled exception
                Console.WriteLine("Block Number: " + blockNumber);
            }
        }
    }
}
