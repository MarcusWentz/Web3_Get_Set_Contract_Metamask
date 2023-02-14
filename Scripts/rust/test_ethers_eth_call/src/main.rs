use std::env;

use std::str::FromStr;
use std::str;

use ethers::types::transaction::eip2718::TypedTransaction;

use ethers_providers::{Provider};
use ethers_core::types::{Address};

use ethers::{
    prelude::*,
};

use eyre::Result;

#[tokio::main]
async fn main() -> Result<()> {

    let rpc_goerli_infura_https = env::var("goerliHTTPS_InfuraAPIKey").expect("$goerliHTTPS_InfuraAPIKey is not set");

    let provider = Provider::<Http>::try_from(rpc_goerli_infura_https).expect("could not instantiate HTTP Provider");

    // let rpc_shardeum_https = "https://liberty20.shardeum.org/";

    // let provider = Provider::<Http>::try_from(rpc_shardeum_https).expect("could not instantiate HTTP Provider");

    let chain_id_connected = provider.get_chainid().await?;
    println!("Got chain_id_connected: {}", chain_id_connected);

    let mut tx_raw = TypedTransaction::Legacy(TransactionRequest::new());

    if chain_id_connected == U256::from(5) {

        let contract_address = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB".parse::<Address>()?; //Chainlink Address Goerli

        let from_wallet = "0x66C1d8A5ee726b545576A75380391835F8AAA43c";

        let hex_string_function = "balanceOf(address)";
        let hex_string_function_hashed = ethers::utils::keccak256(hex_string_function);

        let function_selector:           String = prefix_hex::encode(&hex_string_function_hashed[0..4]);
        let padded_zeroes:               &str = "000000000000000000000000";
        let slice_wallet_to_add_to_data: &str = &from_wallet[2..42];
        
        let raw_string = function_selector + padded_zeroes + slice_wallet_to_add_to_data;

        let raw_call_data = Bytes::from_str(&raw_string).unwrap();

        tx_raw.set_to(contract_address);
        tx_raw.set_data(raw_call_data);

    }
    if chain_id_connected == U256::from(8081) {
        let contract_address = "0x8f01876ccd727fd703787ed477b7f71e1e3adbb1".parse::<Address>()?;
   
        let raw_call_data = Bytes::from_str("0x8da5cb5b").unwrap(); //ERC-20: balanceOf(0x66C1d8A5ee726b545576A75380391835F8AAA43c)

        tx_raw.set_to(contract_address);
        tx_raw.set_data(raw_call_data);

    }
       
    println!("{:?}", tx_raw);

    let call_return_data = provider.call(&tx_raw,None).await?;
    
    println!("{:?}", call_return_data);
    // println!("{:?}", call_return_data.whatisthis); //Shows type as "ethers::types::Bytes" in error message. Credit: https://stackoverflow.com/a/21747400

    Ok(())

}

