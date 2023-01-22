use std::env;
use ethers::prelude::*;
use std::sync::Arc;

#[tokio::main]
async fn main() {
    
    let rpc_goerli_infura_wss = env::var("goerliWebSocketSecureEventsInfuraAPIKey").expect("$goerliWebSocketSecureEventsInfuraAPIKey is not set");

    let private_key_wallet_string = env::var("devTestnetPrivateKey").expect("$devTestnetPrivateKey is not set");
    
    let provider = Arc::new(Provider::connect(rpc_goerli_infura_wss).await.unwrap());

    let signer = private_key_wallet_string.parse::<LocalWallet>().unwrap();

    let chain_id = provider.get_chainid().await.unwrap();
    println!("Got chain_id: {}", chain_id);

    let client = SignerMiddleware::new_with_provider_chain(provider.clone(), signer).await.unwrap();

    let mut blocks_stream = provider.subscribe_blocks().await.unwrap();
    while let Some(block) = blocks_stream.next().await {
        println!("Block number: {}", block.number.unwrap());
        println!("Block time (UNIX): {}", block.timestamp);
        println!("Block validator address to get transaction fees: {:?}", block.author.unwrap() );       
        tip_validator_tx(client.clone(), block.author.unwrap() ).await;
    }
    
}

async fn tip_validator_tx(client_tx: ethers::middleware::SignerMiddleware<Arc<ethers::providers::Provider<Ws>>, Wallet<ethers::core::k256::ecdsa::SigningKey>>,
                          validator_address: H160) {

    let tx_raw = TransactionRequest::new()
        .chain_id(5)
        .to(validator_address)
        .value(1)
        .gas(200000)
        .gas_price(3_000_000_000u32); //3000000000 wei = 3 Gwei
    
    let tx_sent = client_tx.send_transaction(tx_raw, None).await.unwrap();
    println!("Tx sent hash: {:?}", tx_sent.tx_hash());

    // println!("Wait for transction to be mined.");

    // sleep(Duration::from_millis(15000)); //Wait 15 seconds.

    // let stored_data_value_new = simple_storage_instance_tx.stored_data().call().await?;

    // println!("storedDataValue: {0}", stored_data_value_new);

    // // Would not recommend sending transaction by function name since you cannot modify things like the accessList in a simple way.
    // // Send smart contract data transaction with custom MSG.VALUE and gas parameters.
    // let _tx = simple_storage_instance_tx.set(U256::from(tv_sec))
    //             .value(0)
    //             .gas(200000)
    //             .gas_price(3_000_000_000u32)
    //             .send().await?.await?;

    // Ok(())

}

