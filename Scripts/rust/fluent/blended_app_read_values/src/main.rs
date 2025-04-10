use std::env;
use url::Url;
use std::time::{SystemTime};

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


sol!(
    #[allow(missing_docs)]
    #[sol(rpc)]
    SimpleStorage,  
    "abi/SimpleStorage.json"
);

#[tokio::main]
async fn main() -> Result<()> {

    // Pass RPC (Base Sepolia)
    let rpc_base_sepolia_infura_https = "https://rpc.dev.gblend.xyz";
   
    // // Fail RPC (Any network that is not Base Sepolia)
    // let rpc_base_sepolia_infura_https = env::var("optimismSepoliaHTTPS").expect("$baseSepoliaHTTPS is not set");

    let private_key_wallet_string = env::var("devTestnetPrivateKey").expect("$devTestnetPrivateKey is not set");

    let rpc_url_http = Url::parse(&rpc_base_sepolia_infura_https).expect("RPC url string type covert error");
    
    let provider_http = ProviderBuilder::new()
        .with_recommended_fillers()
        .on_http(rpc_url_http);

    // println!("{:?}", provider_http);

    // // https://docs.rs/alloy/latest/alloy/providers/fillers/struct.FillProvider.html

    let chain_id_connected = provider_http.get_chain_id().await?;    // println!("{:?}", latest_block);
    println!("chainId {:?}", chain_id_connected);

    let latest_block = provider_http.get_block_number().await?;
    println!("latestBlock {:?}", latest_block);

    let base_sepolia_chain_id = 20993;

    if chain_id_connected != base_sepolia_chain_id {
        println!("RPC endpoint not connected to Fluent Sepolia (chainId {}).",base_sepolia_chain_id);
        println!("Switch to Fluent Sepolia then try again.");
        return Ok(())
    }

    let contract = SimpleStorage::new("0x7FeA70871E575CE3069aCCE0D25725ec0840dD8E".parse()?, provider_http);

    let stored_data_before = contract.getRustUint256().call().await?._0;
    println!("stored_data_before {}", stored_data_before);
    
    Ok(())

}

