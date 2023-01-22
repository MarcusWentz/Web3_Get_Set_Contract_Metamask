use std::env;
use ethers::prelude::*;
use std::sync::Arc;

#[tokio::main]
async fn main() {
    
    let rpc_goerli_infura_wss = env::var("goerliWebSocketSecureEventsInfuraAPIKey").expect("$goerliWebSocketSecureEventsInfuraAPIKey is not set");

    let provider = Arc::new(Provider::connect(rpc_goerli_infura_wss).await.unwrap());

    let chain_id = provider.get_chainid().await.unwrap();
    println!("Got chain_id: {}", chain_id);

    let mut blocks_stream = provider.subscribe_blocks().await.unwrap();
    while let Some(block) = blocks_stream.next().await {
        println!("Block number: {}", block.number.unwrap());
        println!("Block time (UNIX): {}", block.timestamp);
        println!("Block validator address to get transaction fees: {:?}", block.author);
    }
    
}