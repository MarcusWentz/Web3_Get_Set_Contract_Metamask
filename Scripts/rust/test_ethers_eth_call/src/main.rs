// use std::env;

use std::str::FromStr;

use ethers::types::transaction::eip2718::TypedTransaction;

use ethers_providers::{Provider};
use ethers_core::types::{Address};

use ethers::{
    prelude::*,
};

use eyre::Result;

#[tokio::main]
async fn main() -> Result<()> {

    // let rpc_goerli_infura_https = env::var("goerliHTTPS_InfuraAPIKey").expect("$goerliHTTPS_InfuraAPIKey is not set");

    // let provider = Provider::<Http>::try_from(rpc_goerli_infura_https).expect("could not instantiate HTTP Provider");

    // let contract_address = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB".parse::<Address>()?; //Chainlink Address Goerli

    // let raw_call_data = Bytes::from_str("0x70a0823100000000000000000000000066C1d8A5ee726b545576A75380391835F8AAA43c").unwrap(); //ERC-20: balanceOf(0x66C1d8A5ee726b545576A75380391835F8AAA43c)

    // let mut tx_raw = TypedTransaction::Legacy(TransactionRequest::new());
    // tx_raw.set_to(contract_address);
    // tx_raw.set_data(raw_call_data);
    // tx_raw.set_chain_id(5);

    let rpc_shardeum_https = "https://liberty20.shardeum.org/";

    let provider = Provider::<Http>::try_from(rpc_shardeum_https).expect("could not instantiate HTTP Provider");

    let contract_address = "0x8f01876ccd727fd703787ed477b7f71e1e3adbb1".parse::<Address>()?;

    let raw_call_data = Bytes::from_str("0x8da5cb5b").unwrap(); //ERC-20: balanceOf(0x66C1d8A5ee726b545576A75380391835F8AAA43c)

    let mut tx_raw = TypedTransaction::Legacy(TransactionRequest::new());
    tx_raw.set_to(contract_address);
    tx_raw.set_data(raw_call_data);
    tx_raw.set_chain_id(8081);

    println!("{:?}", tx_raw);

    let call_return_data = provider.call(&tx_raw,None).await?;
    
    println!("{:?}", call_return_data);
    // println!("{:?}", call_return_data.whatisthis); //Shows type as "ethers::types::Bytes" in error message. Credit: https://stackoverflow.com/a/21747400

    Ok(())

}

