use std::env;
use url::Url;

use alloy::{
    network::EthereumWallet,
    providers::{Provider, ProviderBuilder, WsConnect},
    signers::local::PrivateKeySigner,
    primitives::{U256,address},
    rpc::types::{BlockNumberOrTag, Filter},
    sol,
};
use eyre::Result;
use futures_util::stream::StreamExt;

// Defines LED
use rust_gpiozero::*;

sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    SimpleStorage,  
    "abi/SimpleStorage.json"
);

#[tokio::main]
async fn main() -> Result<()> {

    // Pass RPC (Base Sepolia)
    let rpc_base_sepolia_infura_https = env::var("baseSepoliaHTTPS").expect("$baseSepoliaHTTPS is not set");

    // // Fail RPC (Any network that is not Base Sepolia)
    // let rpc_base_sepolia_infura_https = env::var("optimismSepoliaHTTPS").expect("$baseSepoliaHTTPS is not set");

    // let private_key_wallet_string = env::var("devTestnetPrivateKey").expect("$devTestnetPrivateKey is not set");

    // let signer: PrivateKeySigner = private_key_wallet_string.parse().expect("should parse private key");
    // let wallet = EthereumWallet::from(signer.clone());

    let rpc_url_http = Url::parse(&rpc_base_sepolia_infura_https).expect("RPC url string type covert error");
    
    let provider_http = ProviderBuilder::new()
        .with_recommended_fillers()
        // .wallet(wallet)
        .on_http(rpc_url_http);

    let chain_id_connected = provider_http.get_chain_id().await?;    // println!("{:?}", latest_block);
    println!("chainId {:?}", chain_id_connected);

    let latest_block = provider_http.get_block_number().await?;
    println!("latestBlock {:?}", latest_block);

    let base_sepolia_chain_id = 84532;

    if chain_id_connected != base_sepolia_chain_id {
        println!("RPC endpoint not connected to Base Sepolia (chainId {}).",base_sepolia_chain_id);
        println!("Switch to Base Sepolia then try again.");
        return Ok(())
    }

    //Set up WSS for event listener filter.
    let rpc_base_sepolia_infura_wss = env::var("baseSepoliaWSS").expect("$baseSepoliaWSS is not set");
    let rpc_url_wss = Url::parse(&rpc_base_sepolia_infura_wss).expect("RPC url string type covert error");
    
    let ws = WsConnect::new(rpc_url_wss);
    let provider_wss = ProviderBuilder::new().on_ws(ws).await?;

    let contract = SimpleStorage::new("0xeD62F27e9e886A27510Dc491F5530996719cEd3d".parse()?, provider_http);

    let stored_data_value_start = contract.storedData().call().await?._0;
    println!("stored_data_value_start {}", stored_data_value_start);

    // let led = LED::new(27);

    // update_gpio_states(
    //     &led,
	// stored_data_value
    // );


    let simple_storage_address = address!("eD62F27e9e886A27510Dc491F5530996719cEd3d");
    let filter = Filter::new()
        .address(simple_storage_address)
        .event("setEvent()")
        .from_block(BlockNumberOrTag::Latest);

    // Subscribe to logs.
    let sub = provider_wss.subscribe_logs(&filter).await?;
    let mut stream = sub.into_stream();

    println!("Start to listen to event stream...");

    while let Some(log) = stream.next().await {

        println!("setEvent() log detected: {log:?}");

        let stored_data_value_event = contract.storedData().call().await?._0;
        println!("stored_data_value_event {:?}", stored_data_value_event);
     
        // update_gpio_states(
        //     led,
        //     stored_data_value_event
        //     );

        println!("Start to listen to event stream...");

    }

    Ok(())

}

fn update_gpio_states(

    led: &rust_gpiozero::LED,
    stored_data_value: U256) {

    if stored_data_value == U256::from(0) {
       led.off();
       println!("OFF!");
    } else {
       led.on();
       println!("ON!");	
    }
	
}