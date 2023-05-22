using System;
using System.Threading.Tasks;
using System.Reactive.Linq; // dotnet add package System.Reactive
using Nethereum.JsonRpc.WebSocketStreamingClient;
using Nethereum.RPC.Reactive.Eth.Subscriptions; // dotnet add package Nethereum.RPC.Reactive
using Newtonsoft.Json;

namespace Nethereum.WebSocketsStreamingTest
{
    public class BlockHeader
    {
        static void Main(string[] args){
            NewBlockHeader_With_Observable_Subscription().Wait();
        }

        public static async Task NewBlockHeader_With_Observable_Subscription()
        {
            string rpcSepoliaWss = Environment.GetEnvironmentVariable("sepoliaInfuraWSS") ?? throw new InvalidOperationException();

            using(var client = new StreamingWebSocketClient(rpcSepoliaWss))
            {
                // create the subscription
                // (it won't start receiving data until Subscribe is called)
                var subscription = new EthNewBlockHeadersObservableSubscription(client);

                // attach a handler for when the subscription is first created (optional)
                // this will occur once after Subscribe has been called
                subscription.GetSubscribeResponseAsObservable().Subscribe(subscriptionId =>
                    Console.WriteLine("Block Header subscription Id: " + subscriptionId));

                DateTime? lastBlockNotification = null;
                double secondsSinceLastBlock = 0;

                // attach a handler for each block
                // put your logic here
                subscription.GetSubscriptionDataResponsesAsObservable().Subscribe(block => 
                {
                    secondsSinceLastBlock = (lastBlockNotification == null) ? 0 : (int)DateTime.Now.Subtract(lastBlockNotification.Value).TotalSeconds;
                    lastBlockNotification = DateTime.Now;
                    var utcTimestamp = DateTimeOffset.FromUnixTimeSeconds((long)block.Timestamp.Value);
                    Console.WriteLine($"New Block. Number: {block.Number.Value}, Timestamp UTC: {JsonConvert.SerializeObject(utcTimestamp)}, Seconds since last block received: {secondsSinceLastBlock} ");
                });

                bool subscribed = true;

                // handle unsubscription
                // optional - but may be important depending on your use case
                subscription.GetUnsubscribeResponseAsObservable().Subscribe(response =>
                { 
                    subscribed = false;
                    Console.WriteLine("Block Header unsubscribe result: " + response);
                });

                // open the websocket connection
                await client.StartAsync();

                // start the subscription
                // this will only block long enough to register the subscription with the client
                // once running - it won't block whilst waiting for blocks
                // blocks will be delivered to our handler on another thread
                await subscription.SubscribeAsync();

                // run for a minute before unsubscribing
                await Task.Delay(TimeSpan.FromMinutes(1)); 

                // unsubscribe
                await subscription.UnsubscribeAsync();

                //allow time to unsubscribe
                while (subscribed) await Task.Delay(TimeSpan.FromSeconds(1));
            }
        }
    }
}

