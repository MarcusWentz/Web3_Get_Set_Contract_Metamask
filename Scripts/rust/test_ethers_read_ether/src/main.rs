//Credit: https://coinsbench.com/ethereum-with-rust-tutorial-part-1-create-simple-transactions-with-rust-26d365a7ea93
use std::convert::TryFrom;
use std::env;

use ethers_providers::{Middleware, Provider, Http};
use ethers_core::types::{Address};

use eyre::Result;

#[tokio::main]
async fn main() -> Result<()> {

    let rpc_goerli_infura_https = env::var("goerliHTTPS_InfuraAPIKey").expect("$goerliHTTPS_InfuraAPIKey is not set");

    let provider = Provider::<Http>::try_from(rpc_goerli_infura_https).expect("could not instantiate HTTP Provider");

    let chainid = provider.get_chainid().await?;
    println!("Got chainid: {}", chainid);

    let block = provider.get_block(1000000u64).await?;
    println!("Got block: {:?}", block);

    // let block_timestamp = block.clone().unwrap().timestamp;
    // println!("Got block_timestamp: {:?}", block_timestamp);

    // let block_number = block.clone().unwrap().number.unwrap();
    // println!("Got block_number: {:?}", block_number);

    // let block_gas = block.clone().unwrap().gas_used;
    // println!("Got block_gas: {:?}", block_gas);
    
    // let block_gas_limit = block.clone().unwrap().gas_limit;
    // println!("Got block_gas_limit: {:?}", block_gas_limit);

    // let block_hash = block.clone().unwrap().hash.unwrap();
    // println!("Got block_hash: {:?}", block_hash);

    let other_address_hex = "0x0000000000000000000000000000000000000000";
    let other_address = "0x0000000000000000000000000000000000000000".parse::<Address>()?;
    let other_balance = provider.get_balance(other_address, None).await?;
    println!("Balance for address {}: {}",other_address_hex, other_balance);

    // let ens_balance = provider.get_balance("car.eth", None).await?;
    // println!("ENS address balance: {}", ens_balance);

    Ok(())

}

