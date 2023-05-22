using System; //Will need to install dotnet: https://stackoverflow.com/a/70334945 
using System.Threading.Tasks; //Run with: dotnet run
using Nethereum.Web3; // Install with: dotnet add package Nethereum.Web3
using Nethereum.Web3.Accounts; // dotnet add package Nethereum.Web3.Accounts
using Nethereum.Contracts; // dotnet add package Nethereum.Contracts

namespace nethereumapp { //Guide: https://www.quicknode.com/guides/ethereum-development/getting-started/connecting-to-blockchains/how-to-connect-to-ethereum-using-net-nethereum/#connecting-with-ethereum
    class Program {
        static void Main(string[] args) {
            GetBlockNumber().Wait();
        }

        static async Task GetBlockNumber() {
            string rpcSepoliaHttps = Environment.GetEnvironmentVariable("sepoliaInfuraHttps") ?? throw new InvalidOperationException();
            var privateKey = Environment.GetEnvironmentVariable("devTestnetPrivateKey") ?? throw new InvalidOperationException();
          
            var account = new Account(privateKey);
            var web3 = new Web3(account,rpcSepoliaHttps);
            var networkId = await web3.Net.Version.SendRequestAsync(); // OK
            Console.WriteLine($"networkId: {networkId}");

            var contractAddress = "0xbbe97afb978e19033e0bda692e6034f5b3b91312"; //Convert double quotes to single quotes for the ABI object to handle C# syntax errors: https://tools.knowledgewalls.com/convert-double-quotes-to-single-quotes-online
            var contractAbi = @"[{'anonymous':false,'inputs':[],'name':'setEvent','type':'event'},{'inputs':[{'internalType':'uint256','name':'x','type':'uint256'}],'name':'set','outputs':[],'stateMutability':'nonpayable','type':'function'},{'inputs':[],'name':'storedData','outputs':[{'internalType':'uint256','name':'','type':'uint256'}],'stateMutability':'view','type':'function'}]";
            var contractDeployed = web3.Eth.GetContract(contractAbi, contractAddress);

            // var balanceFunction = contractDeployed.GetFunction("storedData");
            // var balance = await contractDeployed.GetFunction("storedData").CallDeserializingToObjectAsync<GetBalanceOutputDTO>(account.Address);

            // latestBlockNumber = await web3.Eth.Blocks.GetBlockNumber.SendRequestAsync();
            // Console.WriteLine($"Latest Block Number is: {latestBlockNumber}");
            
            // var contractAddress = transactionReceipt.ContractAddress;
        }
    }
}