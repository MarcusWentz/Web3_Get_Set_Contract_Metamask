use std::env;
use url::Url;
use std::time::{SystemTime};

use alloy::{
    network::EthereumWallet,
    providers::{Provider, ProviderBuilder},
    signers::local::PrivateKeySigner,
    primitives::U256,
    sol,
};
use eyre::Result;

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

    let private_key_wallet_string = env::var("devTestnetPrivateKey").expect("$devTestnetPrivateKey is not set");

    let signer: PrivateKeySigner = private_key_wallet_string.parse().expect("should parse private key");
    let wallet = EthereumWallet::from(signer.clone());

    let rpc_url = Url::parse(&rpc_base_sepolia_infura_https).expect("RPC url string type covert error");
    
    let provider = ProviderBuilder::new()
        .with_recommended_fillers()
        .wallet(wallet)
        .on_http(rpc_url);

    // println!("{:?}", provider);

    // // https://docs.rs/alloy/latest/alloy/providers/fillers/struct.FillProvider.html

    let chain_id_connected = provider.get_chain_id().await?;    // println!("{:?}", latest_block);
    println!("chainId {:?}", chain_id_connected);

    let latest_block = provider.get_block_number().await?;
    println!("latestBlock {:?}", latest_block);

    let base_sepolia_chain_id = 84532;

    if chain_id_connected != base_sepolia_chain_id {
        println!("RPC endpoint not connected to Base Sepolia (chainId {}).",base_sepolia_chain_id);
        println!("Switch to Base Sepolia then try again.");
        return Ok(())
    }

    let contract = SimpleStorage::new("0xeD62F27e9e886A27510Dc491F5530996719cEd3d".parse()?, provider);

    let stored_data_before = contract.storedData().call().await?._0;
    println!("stored_data_before {}", stored_data_before);

    println!("Set storage to current UNIX time...");

    let tv_sec = get_unix_time();

    let tx_hash = contract
        .set(U256::from(tv_sec))
        .send().await?
        .watch().await?;

    println!("Sent transaction: {tx_hash}");

    let stored_data_after = contract.storedData().call().await?._0;
    println!("stored_data_after {}", stored_data_after);
    
    Ok(())
}

fn get_unix_time() -> usize {

    let now = SystemTime::now(); //Credit: https://stackoverflow.com/questions/55849295/field-tv-sec-doesnt-exist-in-struct-systemtime
    let now_str = format!("{:?}",now); //SystemTime { tv_sec: 1657846097, tv_nsec: 129747070 }
    let now_str_digits_spaces: String = now_str.chars().filter(|c| c.is_digit(10) || *c == ',').collect(); //"1657846097,129747070"
    let now_splitted: Vec<&str> = now_str_digits_spaces.split(",").collect(); //["1657846097", "129747070"]
    let tv_sec:usize =  now_splitted[0].parse().unwrap(); //1657846097
    println!("Unix Time Now: {:?}", tv_sec);
    return tv_sec;
}