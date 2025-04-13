using System; //Will need to install dotnet: https://stackoverflow.com/a/70334945 
using System.Threading.Tasks; //Run with: dotnet run
using Nethereum.Web3; // Install with: dotnet add package Nethereum.Web3
using Nethereum.Web3.Accounts; 
using Nethereum.Contracts; // dotnet add package Nethereum.Contracts
using System.Numerics; //Used for bigInt types. // dotnet add package System.Numerics
using Nethereum.Hex.HexTypes; // dotnet add package Nethereum.Hex.HexTypes
using Nethereum.ABI.FunctionEncoding.Attributes; // dotnet add package Nethereum.ABI
using Nethereum.JsonRpc.WebSocketStreamingClient; // dotnet add package Nethereum.JsonRpc.WebSocketClient
using Nethereum.RPC.Reactive.Eth.Subscriptions; // dotnet add package Nethereum.RPC.Reactive

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

            var storedDataValue = await contractDeployed.GetFunction("storedData").CallAsync<BigInteger>(); //From guide: https://www.atmosera.com/blog/interfacing-net-ethereum-blockchain-smart-contracts-nethereum/
            Console.WriteLine("storedDataValue: {0}", storedDataValue);

            var fromSigner = account.Address;
            Console.WriteLine("fromSigner: {0}", fromSigner);
            var gasLimitRaw = new HexBigInteger(400000);
            var gasPriceNow = await web3.Eth.GasPrice.SendRequestAsync(); // eth_gasPrice request
            Console.WriteLine("gasPriceNow: {0}", gasPriceNow);
            var msgValue = new HexBigInteger(0);
            
            var unixTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
            Console.WriteLine("unixTime: {0}", unixTime);

            var tx = await contractDeployed.GetFunction("set").SendTransactionAsync(
                fromSigner,           
                gasLimitRaw, 
                gasPriceNow,
                msgValue,      
                unixTime                   // Input argument: (x uint256)
            );
            Console.WriteLine("tx: {0}", tx);

            string rpcSepoliaWss = Environment.GetEnvironmentVariable("sepoliaInfuraWSS") ?? throw new InvalidOperationException(); //https://stackoverflow.com/questions/66660102/subscribe-to-contract-events-using-nethereum
            var eventSubscriptionAddressFilter  =  web3.Eth.GetEvent<SetEventObjectEventDTO>(contractAddress).CreateFilterInput();
        
            using (var client = new StreamingWebSocketClient(rpcSepoliaWss))
            {
                var subscription = new EthLogsObservableSubscription(client);
                subscription.GetSubscriptionDataResponsesAsObservable().
                    Subscribe(async log =>
                    {
                        try
                        {
                            EventLog<SetEventObjectEventDTO> decoded = Event<SetEventObjectEventDTO>.DecodeEvent(log);
                            if (decoded != null)
                            {
                                Console.WriteLine("NEW EVENT DETECTED!");
                                var storedDataValueAfterEvent = await contractDeployed.GetFunction("storedData").CallAsync<BigInteger>(); //From guide: https://www.atmosera.com/blog/interfacing-net-ethereum-blockchain-smart-contracts-nethereum/
                                Console.WriteLine("storedDataValueAfterEvent: {0}", storedDataValueAfterEvent);

                            }
                            else Console.WriteLine("Found not standard transfer log");
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine("Log Address: " + log.Address + @" is not a standard transfer log:", ex.Message);
                        }
                    });
                
                await client.StartAsync();
                subscription.GetSubscribeResponseAsObservable().Subscribe(id => Console.WriteLine($"Subscribed with id: {id}"));
                await subscription.SubscribeAsync(eventSubscriptionAddressFilter);

                Console.ReadLine();

                await subscription.UnsubscribeAsync();
                }            
        }
        
        [Event("setEvent")]
        public class SetEventObjectEventDTO : IEventDTO{}
    }
}